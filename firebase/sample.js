import { collection, doc, getFirestore, setDoc, getDoc, getDocs,onSnapshot, query,where } from 'firebase/firestore';
import initFirebase from './initFirebase';
import { useState,useEffect } from 'react';

//TODO: Move all the parameters with default values to the very end (very right) and change the order of parameters accordingly in the 'createMultipleProjects' function
export const app= initFirebase()
export async function createNewProject(assetId, currentPrice = 10, initialPrice, likes = 0, projectName, quantity, db) {
  const projectsRef = collection(db, 'projects')

  await setDoc(doc(projectsRef), {
    assetId: assetId,
    currentPrice: currentPrice,
    initialPrice: initialPrice,
    likes: likes,
    projectName: projectName, 
    quantity: quantity
  }).then(() => console.log("Document written successfully."))
}
export async function createNewUser(displayName,email) {
  const userRef = collection(getFirestore(app), 'users')
  const name=displayName.split(" ")
  let firstName=name[0]
  let lastName=name[1]
  await setDoc(doc(userRef), {    
    FirstName:firstName,
    LastName:lastName,
    email:email,
    credit:0,
  }).then(() => console.log("user Document written successfully."))
}

export async function checkUser(email){
  const userRef = collection(getFirestore(app),"users")
  const q = query(userRef, where("email", "==", email));
  const doc = await getDocs(q)
  let docList = []
  doc.forEach((e)=> docList.push(e))
  if(docList.length!==0){
    // console.log(true)
    return true
  }
  else{ 
    // console.log(false)
    return false
  }
}

export async function createNewAsset(contact, description,assetName) {
  const assetsRef = collection(getFirestore(app), 'assets')

  await setDoc(doc(assetsRef), {    
    contact: contact,
    description: description,
    name: assetName,
  }).then(() => console.log("Asset Document written successfully."))
}


export function createMultipleProjects(db) {
  const assetRef = doc(collection(db, 'assets'), "Wih6mkH29p7c6PlC7EhL")
  for (let i = 0; i < 10; i++) {
    createNewProject(assetRef, 12 + i, 10 + i, 2 + i, `Project ${i + 1}`, 1200 + i * 1000, db)
  }
}

export async function getProjectByDocId(db, documentId) {
  const col = collection(db, 'projects')
  const docRef = doc(col, documentId)
  const projectDocument = await getDoc(docRef)
  if(projectDocument.exists()) {
    //console.log(projectDocument.data())
    return projectDocument.data()
  }
}

const getProjectByDocIdRealTime = (id) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [abc,setAbc]=useState();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    onSnapshot(doc(getFirestore(app), "projects", id), (doc) => {
      // console.log(doc.data())
      setAbc(doc.data())
    })
  }, []);
  return {abc}
}
export {getProjectByDocIdRealTime}