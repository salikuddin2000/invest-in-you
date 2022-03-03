import React,{useEffect,useState} from 'react'
import {useUser} from '../firebase/useUser'
import {getProjectByDocIdRealTime,userDetails, userHoldings} from '../backend/export-backend'



function dashboard() {
  const {user,logout}=useUser()
  const {abc}=getProjectByDocIdRealTime("03zqieiQwGAMvdYZJM9w");
  const {userData} = userDetails("gaming0world726@gmail.com")
  if(userData) {
    userHoldings(userData.ref).then(e => console.log(e))
    // console.log(holdings)
  }
  
  // const {res}=somefunc()
  // useEffect(() => {    
    //   (console.log(user))
    // }, [user]);
    // useEffect(() => {
      //   console.log(abc)
      // }, [abc]);
      // useEffect(() => {
        //   createNewAsset(1234568,"new asset 2","Asset 2")
        // }, []);
        useEffect(()=>{
        // console.log(res)
        },[ ])
        return (
          <>    
          {/* {console.log(res)} */}
    {abc?<h2>{abc.initialPrice}</h2>:<h2>initial</h2>}
    <h1>Logged In</h1>
    <button onClick={logout}>Logout</button>
    </>
  )
}

export default dashboard