import { collection, doc, getFirestore, setDoc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import db from '../firebase/exportFirebase'

export async function createNewAsset(contact, description,assetName) {
    const assetsRef = collection(db, 'assets')
  
    await setDoc(doc(assetsRef), {    
      contact: contact,
      description: description,
      name: assetName,
    }).then(() => console.log("Asset Document written successfully."))
  }