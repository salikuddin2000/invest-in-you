import { updateDoc, collection, doc, getFirestore, setDoc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/exportFirebase';
import { checkUserHolding } from './user.js'

export async function sell(userEmailId, projectId, quantity) {
    // try {
    
    const userCol = collection(db, "users")
    const userIdQuery = query(userCol, where("email", "==", userEmailId))
    const userId = (await (await getDocs(userIdQuery)).docs.at(0).id)
    const userHolding = await checkUserHolding(userId, projectId)
    
    
    if (userHolding === true) {
        
        const projCol = collection(db, "projects")
        const projRef = doc(projCol, projectId)
        const projData = (await getDoc(projRef)).data()
        
        const userRef = doc(userCol, userId)
        const userData = (await getDoc(userRef)).data()
        
        if (projData.quantity >= quantity && userData.credit >= (quantity * projData.currentPrice)) {
            let newProjQuantity = projData.quantity - quantity;
            let newProjCredit = projData.credit + (quantity * projData.currentPrice)
            let newUserCredit = userData.credit - (quantity * projData.currentPrice)
            await updateDoc(projRef, {quantity: newProjQuantity, credit: newProjCredit})
            await updateDoc(userRef, {credit: newUserCredit})
            
        }





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

    await sell("salikuddin2000@gmail.com", "TNu1CBadS5Z1IRw3BQGq", 4)
}

something()