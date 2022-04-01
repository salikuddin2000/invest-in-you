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
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/exportFirebase";
import { useState, useEffect } from "react";
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

export function getProjectByDocIdRealTime(id) {
  const [realtimeProject, setRealtimeProject] = useState()
  useEffect(() => {
    onSnapshot(doc(db, "projects", id), (e) => {
      setRealtimeProject(e.data())
      console.log(e.data());
    })
  }, []);
  return { realtimeProject }
};

export function getProjectByDocId(documentId) {
  const [project, setProject] = useState()
  useEffect(async () => {

    const col = collection(db, "projects");
    const docRef = doc(col, documentId);
    const projectDocument = await getDoc(docRef);
    // console.log(projectDocument)
    if (projectDocument.exists()) {
      setProject(projectDocument.data())
    }
  }, []);
  // console.log(project)
  return { project };

}

export function getProjectsForDashboard() {
  const projectsRef = collection(db, "projects");
  const q = query(projectsRef, limit(6));
  const [recommendationsList, setRecommendationsList] = useState([]);
  useEffect(async () => {
    onSnapshot(q, async (querySnapshot) => {
      const recommendations = []
      for (let doc of querySnapshot.docs) {
        const assetData = await getAssetByAssetRef(doc.data().assetId)
        let obj = {
          projectName: doc.data().projectName,
          assetName: assetData.name,
          assetId: doc.data().assetId.id,
          projectId: doc.id,
          currentPrice: doc.data().currentPrice,
          likes: doc.data().likes
        }
        recommendations.push(obj)
      }

      setRecommendationsList(recommendations)
    })
  }, []);
  useEffect(() => {
    // console.log(recommendationsList)
  }, [recommendationsList]);
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
  const q = query(projectsCol, where('assetId', '==', assetRef))
  const docs = await getDocs(q)

  const projectsList = []
  for (var d of docs.docs) {
    let obj = {
      // assetId: d.data().assetId
      currentPrice: d.data().currentPrice,
      initialPrice: d.data().initialPrice,
      likes: d.data().likes,
      projectName: d.data().projectName,
      quantity: d.data().quantity,
      projectId: d.id
    }
    projectsList.push(obj)
  }

  return projectsList
}
export function SomeFunc() {
  // const dashboard = await getProjectsForDashboard();
  // const projectPage = await getProjectForProjectPage(dashboard[1].projectRef)
  // console.log(dashboard);
  // projectLiveValuesForGraph("OjYummCSOLkwpD1CsZNy")
  //actual function call
  // const res= await assetInfoForAssetPage(docRef)
  // console.log(res)
}


export function projectLiveValuesForGraph(projectId) {
  const livePriceCol = collection(db, "livePrice")
  const projectCol = collection(db, "projects")
  const projRef = doc(projectCol, projectId)
  const q = query(livePriceCol, where("projectId", "==", projRef), orderBy("timestamp", "desc"), limit(30))
  
  const [priceList, setPriceList] = useState([])
  const [timeList, setTimeList] = useState([])
  
  useEffect(()=>{
    let price
    let time
    onSnapshot(q, async (docs) => {
      price=[]
      time=[]
      // var utcSeconds = 1234567890;
      await docs.docs.forEach(async e => {
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        price.push(await e.data().currentPrice)
        d.setUTCSeconds(e.data().timestamp.seconds);
        let timeString=d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+"-"+d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear()
        // console.log(timeString)
        time.push(timeString)
      })
      setPriceList(price)
      setTimeList(time)
    })
  },[projectId])
  
  return {priceList, timeList}
}

// SomeFunc()