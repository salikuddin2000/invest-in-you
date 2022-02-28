import React,{useEffect,useState} from 'react'
import {useUser} from '../firebase/useUser'
import {getProjectByDocIdRealTime} from '../backend/export-backend'

function dashboard() {
  const {user,logout}=useUser()
  const {abc}=getProjectByDocIdRealTime("03zqieiQwGAMvdYZJM9w");
  // useEffect(() => {    
  //   (console.log(user))
  // }, [user]);
  // useEffect(() => {
  //   console.log(abc)
  // }, [abc]);
  // useEffect(() => {
  //   createNewAsset(1234568,"new asset 2","Asset 2")
  // }, []);
  return (
    <>    
    {abc?<h2>{abc.initialPrice}</h2>:<h2>initial</h2>}
    <h1>Logged In</h1>
    <button onClick={logout}>Logout</button>
    </>
  )
}

export default dashboard