import { getFirestore } from "firebase/firestore"
import initFirebase from "./initFirebase"

export const app = initFirebase()
export const db = getFirestore(app)