import { useUser } from "../firebase/useUser";
import { userHoldings } from "../backend/user";
import { userDetails } from "../backend/user";
import AppBarComponent from "../components/AppBarComponent";
import { useState,useEffect } from "react";

function portfolio(){
    const {user} = useUser()
    let i=0
    // console.log(user.email)
    const {userData} = userDetails(user.email)
    const [holdings,setHoldings]=useState();
    useEffect(async() => {
      if(userData){
      setHoldings(await userHoldings(userData.ref))
    }
    }, [userData]);
    useEffect(() => {
      console.log(holdings)
    }, [holdings]);
    return(
    <>
      <AppBarComponent path={"/dashboard"} pathname={"Dashboard"} /><br />
        <img src={user.profilePic} style={{display:"block",marginTop:"60px",borderRadius:"100%",marginLeft:"auto",marginRight:"auto"}} />
        <h1 style={{textAlign:"center"}}>{user?user.name:""}</h1>
        {userData?
          <h4 style={{textAlign:"center"}}>Credit: ₹{userData.data.credit}</h4>
        :""}
        {console.log(holdings)}
        {holdings&&holdings[0]?
        // <h1>true</h1>
        
          holdings.map((holding)=>{
            return(
            <div key={i++} style={{textAlign:"center"}}>
            <h3>Asset: {holding.assetName}</h3>
            <h3>Project: {holding.projectName}</h3>
            <h3>quantity: {holding.quantity}</h3>
            </div>
            )
          })
        :""}
        {/* <div style={{display:"block",paddingLeft:"auto",paddingRight:"auto"}}> */}
        {/* </div> */}
    </>
    )
}

export default portfolio