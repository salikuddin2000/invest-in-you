import React, { useEffect, useState } from 'react'
import { useUser } from '../firebase/useUser'
import { userDetails, projectLiveValuesForGraph } from '../backend/export-backend'
import { Typography } from '@mui/material';
import Recommendations from '../components/dashboardComponents/Recommendations';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AppBarComponent from "../components/AppBarComponent"

function Dashboard(props) {
  const { user, logout } = useUser()
  const { userData } = userDetails("gaming0world726@gmail.com")

  const { priceList, timeList } = projectLiveValuesForGraph("OjYummCSOLkwpD1CsZNy")

  useEffect(() => {
    console.log(priceList)
    console.log(timeList)
    console.log(priceList.length)
    console.log(timeList.length)
  }, [])

  return (
    <>
      <AppBarComponent path={"/portfolio"} pathname={"Portfolio"} /><br />
      <Container style={{ paddingTop: "50px" }}>
        <Box sx={{ my: 2 }}>
          {/* {console.log(res)} */}
          {/* {abc?<h2>{abc.initialPrice}</h2>:<h2>initial</h2>} */}
          <h1>Logged In</h1>
          <button onClick={logout}>Logout</button>
          <Recommendations />
        </Box>
      </Container>
    </>
  )
}

export default Dashboard

