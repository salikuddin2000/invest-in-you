import { CollectionsBookmarkOutlined } from "@mui/icons-material";
import {
  updateDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/exportFirebase";
import { checkUserHolding } from "./user.js";

export async function sell(userEmailId, projectId, quantity) {
  // try {
  console.log("sell");

  const userCol = collection(db, "users");
  const userIdQuery = query(userCol, where("email", "==", userEmailId));
  const userId = await (await getDocs(userIdQuery)).docs.at(0).id;
  const userHolding = await checkUserHolding(userId, projectId);
  console.log(userHolding);

  if (userHolding === true) {
    const projCol = collection(db, "projects");
    const projRef = doc(projCol, projectId);
    const projData = (await getDoc(projRef)).data();

    const userRef = doc(userCol, userId);
    const userData = (await getDoc(userRef)).data();
    console.log(projData);
    console.log(userData);

    const holdingCol = collection(db, "holdings");
    const holdingsQuery = query(
      holdingCol,
      where("userId", "==", userRef),
      where("projectId", "==", projRef)
    );
    const holdingRef = (await getDocs(holdingsQuery)).docs[0];
    // const holding = doc(holdingCol, holdingRef.id)
    const holding = holdingRef.data();
    console.log(holding);

    if (holding.quantity >= quantity) {
      const randomValue = Math.floor(Math.random() * 10);
      console.log("inside");
      let newProjQuantity = projData.quantity + quantity;
      let newProjCredit = projData.credit - quantity * projData.currentPrice;
      let newUserCredit = userData.credit + quantity * projData.currentPrice;
      await updateDoc(projRef, {
        quantity: newProjQuantity,
        credit: newProjCredit,
        currentPrice: projData.currentPrice - randomValue
      });
      await updateDoc(userRef, { credit: newUserCredit });
      // await deleteDoc(holdingRef)
      const livePriceCol = collection(db, "livePrice");
      await setDoc(doc(livePriceCol), {
        //need to pass the asset reference
        assetId: projData.assetId,
        buyerId: userRef,
        timestamp: Timestamp.now().toDate(),
        projectId: projRef,
        oldPrice: projData.currentPrice,
        currentPrice: projData.currentPrice - randomValue,
        quantity: quantity,
      });
    }

    /* const transactionRef = doc(liveCol, "3PTzdQwZyakENmerGTpJ")
        const transactionData = await getDoc(transactionRef)
        console.log(transactionData.data()) */
  }

  // console.log(projData)

  // }
  // catch (e) {
  //     console.log("Sell Transaction Failed")
  //     console.log(e)
  // }
}

export async function buy(projectId, userEmailId, quantity) {
  console.log("buy");

  const userCol = collection(db, "users");
  const userIdQuery = query(userCol, where("email", "==", userEmailId));
  const userId = (await getDocs(userIdQuery)).docs[0].id;
  const projCol = collection(db, "projects");
  const projRef = doc(projCol, projectId);
  const projData = (await getDoc(projRef)).data();

  const userRef = doc(userCol, userId);
  const userData = (await getDoc(userRef)).data();
  console.log(projData);
  console.log(userData);
  if (
      projData.quantity >= quantity &&
      userData.credit >= quantity * projData.currentPrice
      ) {
          console.log("insidebuy");
          let newProjQuantity = projData.quantity - quantity;
          let newProjCredit = projData.credit + quantity * projData.currentPrice;
          let newUserCredit = userData.credit - quantity * projData.currentPrice;
          const randomValue = Math.floor(Math.random() * 10);
          const newTimeStamp = Timestamp.now().toDate()
    await updateDoc(projRef, {
      quantity: newProjQuantity,
      credit: newProjCredit,
      currentPrice: projData.currentPrice + randomValue
    });
    await updateDoc(userRef, { credit: newUserCredit });
    const userHolding = await checkUserHolding(userId, projectId);
    console.log(userHolding);
    if (userHolding === true) {
      const holdingCol = collection(db, "holdings");
      const holdingsQuery = query(
        holdingCol,
        where("userId", "==", userRef),
        where("projectId", "==", projRef)
      );
      const holdingRef = (await getDocs(holdingsQuery)).docs[0].ref;
      // const holding = doc(holdingCol, holdingRef.id)
      const holding = (await getDoc(holdingRef)).data();
      // console.log(holding)

      await updateDoc(holdingRef, { quantity: holding.quantity + quantity });
      console.log("project " + projectId + " bought by" + userId);
      //update live price aka transaction collection
      //return true
    } else {
      // console.log(Timestamp.now().toDate())
      const holdingsCol = collection(db, "holdings");
      console.log(holdingsCol);
      await setDoc(doc(holdingsCol), {
        projectId: projRef,
        quantity: quantity,
        timestamp: newTimeStamp,
        userId: userRef,
      });
      console.log("project " + projectId + " bought by" + userId);

      //update live price aka transaction collection
      //return true
    }

    //Add document to the livePrice
    const livePriceCol = collection(db, "livePrice");
    await setDoc(doc(livePriceCol), {
      //need to pass the asset reference
      assetId: projData.assetId,
      buyerId: userRef,
      timestamp: newTimeStamp,
      projectId: projRef,
      oldPrice: projData.currentPrice,
      currentPrice: projData.currentPrice + randomValue,
      quantity: quantity,
    });
  }
}

async function something() {
  console.log("something");

  // await sell("salikuddin2000@gmail.com", "OjYummCSOLkwpD1CsZNy", 4)
  // await buy("OjYummCSOLkwpD1CsZNy","salikuddin2000@gmail.com",4)
  // console.log(Timestamp.now())
}

// something()
