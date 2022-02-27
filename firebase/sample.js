import { collection, doc, getFirestore, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import initFirebase from './initFirebase';

//TODO: Move all the parameters with default values to the very end (very right) and change the order of parameters accordingly in the 'createMultipleProjects' function
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


export async function getProjectByDocIdRealTime(db, documentId) {
  // const col = collection(db, 'projects')
  // const docRef = doc(col, documentId)
  // const projectDocument = await getDoc(docRef)
  onSnapshot(doc(db, "projects", documentId), (doc) => {
            // console.log(doc.data())
            return doc.data()
       })
}

async function someFunc() {
  const data = getProjectByDocIdRealTime(getFirestore(initFirebase()), 
    "03zqieiQwGAMvdYZJM9w")
    
    console.log(data)
}
someFunc()
// createMultipleProjects(getFirestore(initFirebase()))