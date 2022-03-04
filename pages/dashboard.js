import React,{useEffect,useState} from 'react'
import {useUser} from '../firebase/useUser'
import {getProjectByDocIdRealTime,userDetails, userHoldings, getProjectsForDashboard} from '../backend/export-backend'
import { Typography } from '@mui/material';
import Recommendations from '../components/dashboardComponents/Recommendations';
// import * as React from 'react';




function dashboard(props) {
  const {user,logout}=useUser()
  const {abc}=getProjectByDocIdRealTime("03zqieiQwGAMvdYZJM9w");
  const {userData} = userDetails("gaming0world726@gmail.com")
  const {recommendationsList} = getProjectsForDashboard();
  // if(userData) {
  //   userHoldings(userData.ref).then(e => console.log(e))
  //   // console.log(holdings)
  // }
  useEffect(() => {
    console.log(recommendationsList)
  }, [recommendationsList]);
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
        return (
          <>    
          {/* {console.log(res)} */}
    {abc?<h2>{abc.initialPrice}</h2>:<h2>initial</h2>}
    <h1>Logged In</h1>
    <button onClick={logout}>Logout</button>
    <Typography variant="h6" component="div">
      Recommendations
      <br />
      <Recommendations />
    </Typography>
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    Scroll test <br />
    
    </>
  )
}

export default dashboard





// export default function BackToTop(props) {
//   return (
//     <React.Fragment>
     
//       <Container>
//         <Box sx={{ my: 2 }}>
//           {[...new Array(12)]
//             .map(
//               () => `Cras mattis consectetur purus sit amet fermentum.
// Cras justo odio, dapibus ac facilisis in, egestas eget quam.
// Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
// Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
//             )
//             .join('\n')}
//         </Box>
//       </Container>
      // <ScrollTop {...props}>
      //   <Fab color="secondary" size="small" aria-label="scroll back to top">
      //     <KeyboardArrowUpIcon />
      //   </Fab>
      // </ScrollTop>
//     </React.Fragment>
//   );
// }
