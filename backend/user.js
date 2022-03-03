import { collection, doc, getFirestore, setDoc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/exportFirebase';
import { getProjectByDocId } from './project';


//Create new user
export async function createNewUser(displayName, email) {
  const userRef = collection(db, 'users')
  const name = displayName.split(" ")

  await setDoc(doc(userRef), {
    FirstName: name[0],
    LastName: name[1],
    email: email,
    credit: 0,
  }).then(() => console.log("User Created Successfully."))
}


//Check if the user exists or not
export async function checkUser(email) {
  const userRef = collection(db, "users")
  const q = query(userRef, where("email", "==", email));
  const doc = await getDocs(q)
  let docList = []
  doc.forEach((e) => docList.push(e))
  if (docList.length !== 0) {
    return true
  }
  else {
    return false
  }
}

// returns user data as well as user reference
export function userDetails(email) {
  const [userData, setUserData] = useState()
  const usersColRef = collection(db, 'users')
  const q = query(usersColRef, where("email", '==', email))

  useEffect(async () => {
    const userDetails = await getDocs(q)
    setUserData({
      "data": userDetails.docs[0].data(),
      "ref": userDetails.docs[0].ref
    })
  }, []);

  return { userData };
}

export async function userHoldings(userRef) {
  
    const holdingsColRef = collection(db, 'holdings')
    const q = query(holdingsColRef, where("userId", "==", userRef))
    const doc = await getDocs(q)
    const holdings = []
    for(let d of doc.docs) {

      const project = await getDoc(d.data().projectId)
      const asset = await getDoc(project.data().assetId)

      holdings.push({
        "assetName": asset.data().name,
        "assetRef": asset.ref,
        "projectRef": d.data().projectId,
        "projectName": project.data().projectName,
        "quantity": d.data().quantity,
        "timestamp": d.data().timestamp
      })
    }
    
    // doc.docs.forEach(e => setHoldings(holdings.push(e.data())))

  return holdings
}