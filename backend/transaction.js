import { CollectionsBookmarkOutlined } from '@mui/icons-material';
import { updateDoc, collection, doc, getFirestore, setDoc, getDoc, getDocs, onSnapshot, query, where, deleteDoc, Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/exportFirebase';
import { checkUserHolding } from './user.js'

export async function sell(userEmailId, projectId, quantity) {
    // try {
    console.log("sell")
    
    const userCol = collection(db, "users")
    const userIdQuery = query(userCol, where("email", "==", userEmailId))
    const userId = (await (await getDocs(userIdQuery)).docs.at(0).id)
    const userHolding = await checkUserHolding(userId, projectId)
    console.log(userHolding)
    
    if (userHolding === true) {    
        const projCol = collection(db, "projects")
        const projRef = doc(projCol, projectId)
        const projData = (await getDoc(projRef)).data()
        
        const userRef = doc(userCol, userId)
        const userData = (await getDoc(userRef)).data()
        console.log(projData)
        console.log(userData)
        
        const holdingCol = collection(db,"holdings")
        const holdingsQuery= query(holdingCol,where('userId',"==",userRef),where('projectId',"==",projRef))
        const holdingRef = (await getDocs(holdingsQuery)).docs[0]
        // const holding = doc(holdingCol, holdingRef.id)
        const holding =holdingRef.data()
        console.log(holding)

        if(holding.quantity>=quantity){
                console.log("inside")
                let newProjQuantity = projData.quantity + quantity;
                let newProjCredit = projData.credit - (quantity * projData.currentPrice)
                let newUserCredit = userData.credit + (quantity * projData.currentPrice)
                await updateDoc(projRef, {quantity: newProjQuantity, credit: newProjCredit})
                await updateDoc(userRef, {credit: newUserCredit})
                // await deleteDoc(holdingRef)

        }
        // if(holding)
        // holdingRef.forEach((obj)=>console.log(obj.data))
        // if (/* projData.quantity >= quantity && userData.credit >= (quantity * projData.currentPrice) */) {
        //     console.log("inside")
            
        // }





        const liveCol = collection(db, "livePrice")


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
    console.log("buy")
    
    const userCol = collection(db, "users")
    const userIdQuery = query(userCol, where("email", "==", userEmailId))
    const userId = (await getDocs(userIdQuery)).docs[0].id
    const projCol = collection(db, "projects")
    const projRef = doc(projCol, projectId)
    const projData = (await getDoc(projRef)).data()
    
    const userRef = doc(userCol, userId)
    const userData = (await getDoc(userRef)).data()
    console.log(projData)
    console.log(userData)

    if (projData.quantity >= quantity && userData.credit >= (quantity * projData.currentPrice)) {
        console.log("insidebuy")
        let newProjQuantity = projData.quantity - quantity;
        let newProjCredit = projData.credit + (quantity * projData.currentPrice)
        let newUserCredit = userData.credit - (quantity * projData.currentPrice)
        await updateDoc(projRef, {quantity: newProjQuantity, credit: newProjCredit})
        await updateDoc(userRef, {credit: newUserCredit}) 
        const userHolding = await checkUserHolding(userId, projectId)
        if(userHolding === true){
            const holdingCol = collection(db,"holdings")
            const holdingsQuery= query(holdingCol,where('userId',"==",userRef),where('projectId',"==",projRef))
            const holdingRef = (await getDocs(holdingsQuery)).docs[0]
            // const holding = doc(holdingCol, holdingRef.id)
            const holding =holdingRef.data()
            console.log(holding)
            const obj={
                "projectId":projRef,
                "userId":userRef,
                "quantity":holding.quantity + quantity,
                "timestamp":Timestamp.now(),
            } 
            await updateDoc(holdingRef,{quantity:(holding.quantity+ quantity)})
            //update live price aka transaction collection
            //return true
        } 
        else{

            await setDoc(collection(db,"holdings"), {
                "projectId":projRef,
                "userId":userRef,
                "quantity":quantity,
                "timestamp":Timestamp.now(),
              });
            //update live price aka transaction collection  
            //return true
        }
    }

}

async function something() {
    console.log("something")

    // await buy("salikuddin2000@gmail.com", "OjYummCSOLkwpD1CsZNy", 4)
    // await buy("OjYummCSOLkwpD1CsZNy","salikuddin2000@gmail.com",4)
    // console.log(Timestamp.now())
}

something()