import { collection, doc, getFirestore, setDoc, getDoc, getDocs, onSnapshot, query, where ,limit} from 'firebase/firestore';
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

  export async function assetsForDashboard(){
    const assetColRef = collection(db, 'assets')
    const q = query(assetColRef, limit(3))
    const doc = await getDocs(q)
    const assets = []
    for(let d of doc.docs) {
      assets.push({
        "assetId": d.id,
        "name": d.data().name,
        "contact": d.data().contact,
        "profession": d.data().Profession,
        "description": d.data().description,
        "photoURL": d.data().photoURL
      })
    }
    
    // doc.docs.forEach(e => setHoldings(holdings.push(e.data())))

  return assets;
  }

  // call()