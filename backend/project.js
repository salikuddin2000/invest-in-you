import {
  collection,
  batch,
  doc,
  getFirestore,
  setDoc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  limit,
} from "firebase/firestore";
import { db } from "../firebase/exportFirebase";
import { useState, useEffect } from "react";
import { async } from "@firebase/util";
import { assetInfoForAssetPage, getAssetByAssetRef } from "./asset";

export async function createNewProject(
  assetId,
  currentPrice = 10,
  initialPrice,
  likes = 0,
  projectName,
  quantity
) {
  const projectsRef = collection(db, "projects");

  await setDoc(doc(projectsRef), {
    assetId: assetId,
    currentPrice: currentPrice,
    initialPrice: initialPrice,
    likes: likes,
    projectName: projectName,
    quantity: quantity,
  }).then(() => console.log("Document written successfully."));
}

export function createMultipleProjects(db) {
  const assetRef = doc(collection(db, "assets"), "Wih6mkH29p7c6PlC7EhL");
  for (let i = 0; i < 10; i++) {
    createNewProject(
      assetRef,
      12 + i,
      10 + i,
      2 + i,
      `Project ${i + 1}`,
      1200 + i * 1000,
      db
    );
  }
}

export const getProjectByDocIdRealTime = (id) => {
  const [abc, setAbc] = useState();
  useEffect(() => {
    onSnapshot(doc(db, "projects", id), (doc) => {
      setAbc(doc.data());
    });
  }, []);
  return { abc };
};

export async function getProjectByDocId(db, documentId) {
  const col = collection(db, "projects");
  const docRef = doc(col, documentId);
  const projectDocument = await getDoc(docRef);
  if (projectDocument.exists()) {
    return projectDocument.data();
  }
}

export function getProjectsForDashboard() {
  const projectsRef = collection(db, "projects");
  const q = query(projectsRef, limit(6));
  const [recommendationsList, setRecommendationsList] = useState([]);
  useEffect(async () => {
    const data = await getDocs(q);
    // let recommendationsList = []
    let arr = [];
    for (var d of data.docs) {
      const assetDoc = await getDoc(d.data().assetId);
      let obj = {
        projectName: d.data().projectName,
        currentPrice: d.data().currentPrice,
        likes: d.data().likes,
        assetName: assetDoc.data().name,
        projectRef: d.ref,
      };
      // console.log(obj)
      arr.push(obj);
    }
    setRecommendationsList(arr);
  }, []);

  return { recommendationsList };
}

export async function getProjectForProjectPage(projectRef) {
  const project = await getDoc(projectRef);
  const asset = await getDoc(project.data().assetId);
  // console.log(asset.data())

  return {
    project: project.data(),
    asset: asset.data(),
  };
}

export async function getProjectByProjectRef(projectRef) {
  const project = await getDoc(projectRef);

  if (project.exists()) return project.data();
}

export async function getListofProjectsByAssetRef(assetRef) {
  // actual workabable code
  const projectsCol = collection(db, "projects")
  const q = query(projectsCol, where('assetId','==', assetRef))
  const docs = await getDocs(q)

  const projectsList=[]
  for(var d of docs.docs) {
    projectsList.push(d.data())
  }

  return projectsList
}
async function SomeFunc() {
  // const dashboard = await getProjectsForDashboard();
  // const projectPage = await getProjectForProjectPage(dashboard[1].projectRef)
  // console.log(dashboard);
  const col = collection(db, 'assets')
  const docRef = doc(col, 'Wih6mkH29p7c6PlC7EhL')

  //actual function call
  const res= await assetInfoForAssetPage(docRef)
  console.log(res)
}

SomeFunc()
