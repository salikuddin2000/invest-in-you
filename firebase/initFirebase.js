import {initializeApp,getApps} from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/analytics'
import 'firebase/performance'
// require('dotenv').config()
// import '../.env''

const clientCredentials={
    apiKey: "AIzaSyB4odw6MC743jOE9a6mnSOQGn_NjaBmorU",
    authDomain: "investinyou-968c6.firebaseapp.com",
    projectId: "investinyou-968c6",
    storageBucket: "investinyou-968c6.appspot.com",
    messagingSenderId: "716406252899",
    appId: "1:716406252899:web:c09804ddc4d660b6a41f56",
    measurementId: "G-01Y5DMCTXQ"
}
export default function initFirebase(){

        if (typeof window !== undefined) {
            initializeApp(clientCredentials)
            console.log("Firebase has been init successfully")
        }

}
