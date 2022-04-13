import { useUser } from "../firebase/useUser";
import { userHoldings } from "../backend/user";
import { userDetails } from "../backend/user";
import AppBarComponent from "../components/AppBarComponent";
import { useState, useEffect } from "react";
import Link from "next/link";
import FooterComponent from "../components/FooterComponent";
import Head from "next/head";
import { Button, Skeleton } from "@mui/material";
import Loader from "../components/Loader";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Container,
  CardActionArea,
} from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
// import { Block } from "@mui/icons-material";

const useStyles = makeStyles({
  root: {
    maxWidth: 310,
    transition: "transform 0.15s ease-in-out",
    "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Portfolio() {
  const classes = useStyles();
  const [labels, setLabels] = useState();
  const [dataSet, setDataSet] = useState();

  const { user, logout } = useUser();
  let i = 0;
  // console.log(user.email)
  const email = user ? user.email : "sample";
  const { userData } = userDetails(email);
  const [holdings, setHoldings] = useState();
  useEffect(async () => {
    if (userData) {
      // console.log(userData.ref.id);
      setHoldings(await userHoldings(userData.ref));
    }
  }, [userData]);
  useEffect(() => {
    console.log(holdings);
    if (holdings) {
      const projectNames = [];
      const quantities = [];
      holdings.map((holding) => {
        projectNames.push(holding.projectName);
        quantities.push(holding.quantity);
      });
      setLabels(projectNames);
      setDataSet(quantities);
    }
  }, [holdings]);
  // async function signOut(){
  //   return logout;
  // }
  if (user && userData)
    return (
      <>
        <Head>
          <title>InvestInYou | Portfolio</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AppBarComponent path={"/dashboard"} pathname={"Dashboard"} />
        <br />
        <Box style={{ paddingLeft: "10%", paddingRight: "10%" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginLeft: "auto",
              marginRight: "auto",
              width: "80%",
              // marginBottom: "-100px",

              // paddingTop: "100px",
            }}
          >
            <div
              style={{
                flexBasis: "50%",
                // marginLeft: "70px",
                // marginTop: "110px",
              }}
            >
              {user.profilePic ? (
                <>
                {console.log(user.profilePic)}
                <img
                  src={user.profilePic}
                  style={{
                    display: "block",
                    marginTop: "100px",
                    borderRadius: "100%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    height:"200px",
                    weight:"200px",
                    // maxWidth:"300px",
                    // maxHeight:"300px"
                  }}
                />
                </>
              ) : (
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={80}
                  height={80}
                  style={{
                    display: "block",
                    marginTop: "60px",
                    borderRadius: "100%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
              )}
              <h1 style={{ textAlign: "center", display: "block" }}>
                {user ? user.name : ""}
              </h1>
              {userData ? (
                <Card
                  sx={{ minWidth: 180 }}
                  style={{
                    display: "block",
                    textAlign: "center",
                    width: "150px",
                    // float: "right",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginBottom: "30px",
                    borderRadius: "13px",
                    background: "#ffffff",
                    boxShadow: "5px 5px 7px #e8e8e8,-5px -5px 7px #ffffff",
                  }}
                  className={classes.root}
                >
                  <CardActionArea>
                    <CardContent>
                      <Typography
                        color="text.secondary"
                        style={{ fontSize: "22px" }}
                        sx={{ fontWeight: "650" }}
                      >
                        Credit
                      </Typography>
                      <Typography
                        sx={{ fontWeight: "bold", fontSize: 22 }}
                        color={"green"}
                      >
                        ₹{userData.data.credit}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ) : (
                ""
              )}
            </div>
            <div
              style={{
                flexBasis: "20%",
                marginLeft: "70px",
                marginTop: "110px",
              }}
            >
              {labels?<Doughnut
                style={{
                  maxWidth: "300px",
                  maxHeight: "300px",
                  display: "block",
                  // marginLeft: "20%",
                }}
                data={{
                  labels: labels,
                  datasets: [
                    {
                      label: "My First Dataset",
                      data: dataSet,
                      backgroundColor: [
                        "rgb(255, 99, 132)",
                        "rgb(54, 162, 235)",
                        "rgb(255, 205, 86)",
                        "rgb(180, 53, 86)",
                        "rgb(33, 150, 86)",
                      ],
                      hoverOffset: 4,
                    },
                  ],
                }}
              /> :""}
              
            </div>
          </div>
          <br />
        </Box>

        {console.log(holdings)}
        <TableContainer
          component={Paper}
          style={{ marginRight: "auto", marginLeft: "auto", width: "90%" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ textAlign: "center" }}>
              <TableRow>
                <TableCell>
                  <h2>Asset</h2>
                </TableCell>
                <TableCell>
                  <h2>Project</h2>
                </TableCell>
                <TableCell>
                  <h2>Quanity</h2>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {holdings && holdings[0]
                ? holdings.map((holding) => {
                    return (
                      <StyledTableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        key={i++}
                        style={{ textAlign: "center" }}
                      >
                        <StyledTableCell component="th" scope="row">
                          <Link
                            style={{cursor:"pointer"}}
                            href={{
                              pathname: "/" + holding.assetName,
                              query: {
                                assetRef: holding.assetRef.id,
                              },
                            }}
                            as={`/${holding.assetRef.id}`}
                          >
                            <h3 style={{cursor:"pointer"}}>{holding.assetName}</h3>
                          </Link>
                        </StyledTableCell>
                        {/* {console.log(holding.assetRef.id)} */}
                        <StyledTableCell component="th" scope="row">
                          <Link
                            href={{
                              pathname:
                                "/" +
                                holding.assetName +
                                "/" +
                                holding.projectName,
                              query: {
                                projectRef: holding.projectRef.id,
                                assetRef: holding.assetRef.id,
                              },
                            }}
                            as={`/${holding.assetRef.id}/${holding.projectRef.id}`}
                          >
                            <h3 style={{cursor:"pointer"}}>{holding.projectName}</h3>
                          </Link>
                        </StyledTableCell>
                        <StyledTableCell>
                          <h3>{holding.quantity}</h3>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })
                : ""}
            </TableBody>
          </Table>
        </TableContainer>
        <div
        className="logoutButton"
          // style={{ marginLeft: "auto", marginRight: "auto", display: "block",marginTop:"40px",color:"black", fontWeight:"800",background:" #ffffff",boxShadow:"inset 5px 5px 10px #d4d4d4, inset -5px -5px 10px #ffffff"}}
          // onClick={async () => {
          //   await logout();
          // }}
        >
          Logout
        </div>
        {/* <div style={{display:"block",paddingLeft:"auto",paddingRight:"auto"}}> */}
        {/* </div> */}
        <FooterComponent />
      </>
    );
  else return <Loader />;
}

export default Portfolio;
