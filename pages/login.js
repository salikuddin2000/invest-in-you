import React,{useEffect,useState} from 'react'
import {useUser} from '../firebase/useUser'
import { createNewAsset, getProjectByDocIdRealTime } from '../firebase/sample'

function login() {
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
    <h1>login</h1>
    <button onClick={logout}>Logout</button>
    </>
  )
}

export default login