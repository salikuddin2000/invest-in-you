import initFirebase from '../../firebase/initFirebase';
import { useEffect, useState } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import {
    getAuth,
    GoogleAuthProvider,
} from "firebase/auth";
import { setUserCookie } from '../../firebase/userCookies';
import { mapUserData } from '../../firebase/mapUserData'

initFirebase() // initialize firebase

const auth = getAuth()

const firebaseAuthConfig = {
    signInFlow: 'popup',
    // Auth providers
    // https://github.com/firebase/firebaseui-web#configure-oauth-providers
    signInOptions: [
        // add additional auth flows below
        GoogleAuthProvider.PROVIDER_ID,
    ],
    // signInSuccessUrl: 'http://localhost:3000/dashboard',
    credentialHelper: 'none',
    callbacks: {
        signInSuccessWithAuthResult: async ({ user }, redirectUrl) => {
            const userData = mapUserData(user)
            setUserCookie(userData)
        },
    },
}

const FirebaseAuth = () => {
    // Do not SSR FirebaseUI, because it is not supported.
    // https://github.com/firebase/firebaseui-web/issues/213
    const [renderAuth, setRenderAuth] = useState(false)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setRenderAuth(true)
        }
    }, [])
    return (
        <div>
            {renderAuth ? (
                <StyledFirebaseAuth
                    uiConfig={firebaseAuthConfig}
                    firebaseAuth={auth}
                />
            ) : null}
        </div>
    )
}

export default FirebaseAuth