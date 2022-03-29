import { CollectionsBookmarkOutlined } from '@mui/icons-material';
import { updateDoc, collection, doc, getFirestore, setDoc, getDoc, getDocs, onSnapshot, query, where, deleteDoc } from 'firebase/firestore';
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
        // console.log("sael")        
        const projCol = collection(db, "projects")
        const projRef = doc(projCol, projectId)
        const projData = (await getDoc(projRef)).data()
        
        const userRef = doc(userCol, userId)
        const userData = (await getDoc(userRef)).data()
        console.log(projData)
        console.log(userData)
        
        const holdingCol = collection(db,"holdings")
        const holdingsQuery= query(holdingCol,where('userId',"==",userRef),where('projectId',"==",projRef))
        const holdingRef = await (await getDocs(holdingsQuery)).docs.at(0)
        const holding = doc(holdingCol, holdingRef.id)
        console.log(holding)

        // if(holdingCol.quantity>=quantity){
        //         console.log("inside")
        //         let newProjQuantity = projData.quantity + quantity;
        //         let newProjCredit = projData.credit - (quantity * projData.currentPrice)
        //         let newUserCredit = userData.credit + (quantity * projData.currentPrice)
        //         await updateDoc(projRef, {quantity: newProjQuantity, credit: newProjCredit})
        //         await updateDoc(userRef, {credit: newUserCredit})
        //         // await deleteDoc(holdingRef)

        // }
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

export function buy(projectId, userId, quantity) { }

async function something() {
    console.log("something")

    await sell("salikuddin2000@gmail.com", "OjYummCSOLkwpD1CsZNy", 4)
}

something()