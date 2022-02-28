import { collection, doc, getFirestore, setDoc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase/exportFirebase';
import { useState, useEffect } from 'react';

export async function createNewProject(assetId, currentPrice = 10, initialPrice, likes = 0, projectName, quantity) {
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


export function createMultipleProjects(db) {
  const assetRef = doc(collection(db, 'assets'), "Wih6mkH29p7c6PlC7EhL")
  for (let i = 0; i < 10; i++) {
    createNewProject(assetRef, 12 + i, 10 + i, 2 + i, `Project ${i + 1}`, 1200 + i * 1000, db)
  }
}

export const getProjectByDocIdRealTime = (id) => {
  const [abc, setAbc] = useState();
  useEffect(() => {
    onSnapshot(doc(db, "projects", id), (doc) => {
      setAbc(doc.data())
    })
  }, []);
  return { abc }
}