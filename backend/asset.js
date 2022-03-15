import { collection, doc, getFirestore, setDoc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase/exportFirebase';
import { getListofProjectsByAssetRef } from './project';

export async function createNewAsset(contact, description,assetName) {
    const assetsRef = collection(db, 'assets')
  
    await setDoc(doc(assetsRef), {    
      contact: contact,
      description: description,
      name: assetName,
    }).then(() => console.log("Asset Document written successfully."))
  }




  export async function getAssetByAssetRef(assetRef) {
    const asset = await getDoc(assetRef)
    
    return asset.exists() ? asset.data() : null
  }

  export async function assetInfoForAssetPage(assetId) {
    const col = collection(db, "assets");
    const assetRef = doc(col, assetId);
    const obj = {}
    obj['asset'] = await getAssetByAssetRef(assetRef)
    obj['projects'] = await getListofProjectsByAssetRef(assetRef)

    return obj
  }

  // call()