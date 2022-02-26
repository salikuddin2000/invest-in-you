import React,{useEffect} from 'react'
import {useUser} from '../firebase/useUser'

function login() {
  const {user,logout}=useUser()
  useEffect(() => {    
    (console.log(user))
  }, [user]);
  return (
    <>    
    <h1>login</h1>
    <button onClick={logout}>Logout</button>
    </>
  )
}

export default login