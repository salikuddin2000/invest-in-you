import { collection, doc, getFirestore, setDoc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/exportFirebase';


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

function userDetails(email) {
  const [userData, setUserData] = useState();
  const usersColRef = collection(db, 'users')
  const q = query(usersColRef, where("email", '==', email))
  
  useEffect(async() => {
    const userDetails = await getDocs(q)
    userDetails.forEach(e => setUserData(e.data()))
  }, []);
  
  return {userData};
  
}
export {userDetails}
