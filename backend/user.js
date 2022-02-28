import { collection, doc, getFirestore, setDoc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase/exportFirebase';

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

export async function getProjectByDocId(db, documentId) {
  const col = collection(db, 'projects')
  const docRef = doc(col, documentId)
  const projectDocument = await getDoc(docRef)
  if(projectDocument.exists()) {
    //console.log(projectDocument.data())
    return projectDocument.data()
  }
}