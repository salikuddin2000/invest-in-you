import React, { useEffect, useState } from 'react'
import { useUser } from '../firebase/useUser'
import { getProjectByDocIdRealTime, userDetails, userHoldings, getProjectsForDashboard } from '../backend/export-backend'
import { Typography } from '@mui/material';
import Recommendations from '../components/dashboardComponents/Recommendations';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';
import Slide from '@mui/material/Slide';
import { Button } from "@mui/material";
import useScrollTrigger from '@mui/material/useScrollTrigger';
// import Typography from '@mui/material/Typography';
// import "../styles/globals.css";
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AppBarComponent from "../components/AppBarComponent"

function dashboard(props) {
  const { user, logout } = useUser()
  const { abc } = getProjectByDocIdRealTime("03zqieiQwGAMvdYZJM9w");
  const { userData } = userDetails("gaming0world726@gmail.com")
  const { recommendationsList } = getProjectsForDashboard();
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
      <AppBarComponent path={"/portfolio"} pathname={"portfolio"} /><br />
      <Container style={{paddingTop:"50px"}}>
        <Box sx={{ my: 2 }}>
          {/* {console.log(res)} */}
          {/* {abc?<h2>{abc.initialPrice}</h2>:<h2>initial</h2>}
    <h1>Logged In</h1>
  <button onClick={logout}>Logout</button> */}
  <Recommendations />

          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
          Scroll test<br />
        </Box>
      </Container>
    </>
  )
}

export default dashboard

