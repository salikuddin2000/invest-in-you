import { useEffect, useState } from 'react'
import Router from 'next/router'
import initFirebase from './initFirebase'
import { getAuth } from "firebase/auth";
import {
    removeUserCookie,
    setUserCookie,
    getUserFromCookie,
} from './userCookies'
import { mapUserData } from './mapUserData'
import {app} from './exportFirebase'
import { checkUser, createNewUser } from '../backend/export-backend';

// initFirebase()
app

const useUser = ()  => {
    const [user, setUser] = useState({})
    const auth = getAuth()
    
    const logout = async () => {
        try {
            Router.push("/");
            console.log("logout called")
            await auth.signOut();
            removeUserCookie();
        } catch (e) {
            console.log(e.message);
        }
    }
    
    useEffect(() => {
        const {pathname} = Router
        // Firebase updates the id token every hour, this
        // makes sure the react state and the cookie are
        // both kept up to date
        const cancelAuthListener = auth.onIdTokenChanged(async (user) =>  {
            if(user) {
                const userData = mapUserData(user)
                const d = await checkUser(userData.email)
                console.log(d)
                if(d===false){
                    // if checkUser returns false
                    console.log("creating.....")
                    createNewUser(userData.name,userData.email)
                }
                setUserCookie(userData)
                setUser(userData)
                if(pathname=='/'){
                 Router.push('/dashboard')
                }
            } else {
                removeUserCookie()
                setUser()
                Router.push('/')
            }
        })

        const userFromCookie = getUserFromCookie()
        if (!userFromCookie) {
            Router.push('/')
            return
        }
        setUser(userFromCookie)

        return () => {
            console.log(user),
            cancelAuthListener()
        }
    }, [])

    return { user, logout }
}

export { useUser }