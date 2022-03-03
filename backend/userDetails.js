import { collection, doc, getFirestore, setDoc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/exportFirebase';

async function userDetails(email) {
    const [userData, setUserData] = useState();
    const usersColRef = collection(db, 'users')
    const q = query(usersColRef, where("email", '==', email))
    const userDetails = await getDocs(q)
    userDetails.forEach((e) => console.log(e.data()))
    
    useEffect(() => {
      userDetails.forEach(e => setUserData(e.data()))
    }, []);
    
    if (userData) return userData;
    else return {};
    
  }
  export {userDetails}