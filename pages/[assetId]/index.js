import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { assetInfoForAssetPage } from "../../backend/asset";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Container,
  CardActionArea,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Link from "next/link";
import AppBarComponent from "../../components/AppBarComponent";
import { Grid } from "@mui/material";

const footers = [
  {
    title: "Quick links",
    description: ["Vision & Values", "Careers", "Services"],
  },
  {
    title: "Useful Links",
    description: ["Awards", "Media", "Contact"],
  },
  // {
  //   title: 'Legal',
  //   description: ['Privacy policy', 'Terms of use'],
  // },
];

export async function getServerSideProps(context) {
  console.log(context.query);
  // returns { id: episode.itunes.episode, title: episode.title}

  //you can make DB queries using the data in context.query
  return {
    props: {
      assetRef: context.query /* .projectRef */, //pass it to the page props
    },
  };
}
const useStyles = makeStyles({
  root: {
    maxWidth: 310,
    transition: "transform 0.15s ease-in-out",
    "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
  },
});
function Assetpage(props) {
  const classes = useStyles();
  // const router =useRouter()
  // const assetId = router.query.assetId
  const [assetInfo, setAssetInfo] = useState();
  const [projectList, setProjectList] = useState();
  useEffect(async () => {
    console.log(props);
    const obj = await assetInfoForAssetPage(props.assetRef.assetId);
    setAssetInfo(obj.asset);
    setProjectList(obj.projects);
  }, [props]);
  useEffect(() => {
    console.log(assetInfo);
  }, [assetInfo]);
  useEffect(() => {
    console.log(projectList);
  }, [projectList]);
  return (
    // <div>Assetpage{/*  {[assetId]} */}</div>
    <>
      <AppBarComponent path={"/portfolio"} pathname={"portfolio"} />
      <Box sx={{ marginTop: "80px", marginLeft: "15%", marginRight: "15%" }}>
        {assetInfo ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap" /* ,flexDirection:"column" */,
              paddingTop: "100px",
            }}
          >
            <img
              src={assetInfo.photoURL}
              style={{ height: "50vh" /* ,maxWidth:"50vh",flexBasis:"50%" */ }}
            />
            <div style={{ flexBasis: "50%", marginLeft: "70px" }}>
              <h1
                style={{
                  fontSize: "43px",
                  margin: "0px",
                  marginBottom: "10px",
                  marginTop: "10px",
                }} /*  style={{display:"inline"}} */
              >
                {assetInfo.name}
              </h1>
              <h2 style={{ color: "grey", fontWeight: "600", margin: "0px" }}>
                General Profile
              </h2>
              <h3
                style={{
                  color: "grey",
                  fontWeight: "500",
                  textAlign: "justify",
                  margin: "0px",
                }}
              >
                <b>Short Bio:</b> {assetInfo.description}
              </h3>
              <h3
                style={{
                  color: "grey",
                  fontWeight: "500",
                  margin: "0px",
                  marginTop: "10px",
                }}
              >
                <b>Profession:</b> {assetInfo.Profession}
              </h3>
            </div>
            <br />
          </div>
        ) : (
          ""
        )}
        <br />
        <br />
        <hr
          style={{
            border: "0",
            height: "1px",
            backgroundImage:
              "linear-gradient(to right, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.05))",
          }}
        />
        <br />
        {projectList
          ? projectList.map((obj) => (
              <Card
                key={obj.projectId}
                sx={{ minWidth: 180 }}
                style={{
                  display: "inline-block",
                  width: "25%",
                  marginLeft: "4%",
                  marginRight: "4%",
                  marginBottom: "10px",
                }}
                className={classes.root}
              >
                <CardActionArea>
                  <Link
                    href={{
                      pathname:
                        "/" + props.assetRef.assetId + "/" + obj.projectId,
                      query: {
                        projectRef: obj.projectId,
                      },
                    }}
                    as={`/${props.assetRef.assetId}/${obj.projectId}`}
                  >
                    <CardContent>
                      <Typography variant="h5" style={{ fontWeight: "bolder" }}>
                        {obj.projectName}
                      </Typography>
                      <Typography
                        color="text.secondary"
                        sx={{ fontWeight: "700", marginBottom: "15px" }}
                      >
                        {obj.assetName}
                      </Typography>
                      <Typography
                        color="text.secondary"
                        style={{ fontSize: "10px" }}
                        sx={{ fontWeight: "650" }}
                      >
                        Current Price
                      </Typography>
                      <Typography
                        sx={{ fontWeight: "bold", fontSize: 20 }}
                        color={"green"}
                      >
                        ₹{obj.currentPrice}
                      </Typography>
                    </CardContent>
                  </Link>
                </CardActionArea>
              </Card>
            ))
          : ""}
      </Box>
      {/* Footer */}
      <Container
        maxWidth="100%"
        component="footer"
        sx={{
          mt: 8,
          py: [3, 6],
        }}
        style={{backgroundColor:"#c2e5dd"}}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
        <Grid item xs={6} sm={3} key="InvestInYou">
        <Typography variant="h5" color="text.primary" style={{fontWeight:'600',fontSize:"28px"}} gutterBottom>
                InvestInYou
              </Typography>
              <p style={{textAlign:"justify"}}>
                Invest in You have much planned for the future, working with
                great clients and continued Stock Investment. If you’d like to
                join our team.
              </p>
          </Grid>
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" style={{fontWeight:'600'}} color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul style={{listStyle:"none",paddingLeft:"10px"}}>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <div style={{marginLeft:"auto",marginRight:"auto",textAlign:"center"}}>
        <Typography style={{ marginLeft: "5px", display: "inline" }}>
        <b>&#169; InvestInYou</b>
        </Typography>
        </div>
      </Container>

    </>
  );
}

export default Assetpage;
