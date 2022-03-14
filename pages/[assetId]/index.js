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
      {assetInfo ? (
        <>
          <h1>{assetInfo.name}</h1>
          <h2>contact: {assetInfo.contact}</h2>
          <h3>description: {assetInfo.description}</h3>
        </>
      ) : (
        ""
      )}
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
    </>
  );
}

export default Assetpage;
