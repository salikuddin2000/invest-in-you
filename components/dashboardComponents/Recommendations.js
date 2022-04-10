import {
  Card,
  CardContent,
  Typography,
  Box,
  Container,
  CardActionArea,
} from "@mui/material";
import { textAlign } from "@mui/system";
import {
  getProjectByDocIdRealTime,
  getProjectsForDashboard,
} from "../../backend/project";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import { async } from "@firebase/util";
import Link from "next/link";
import { Skeleton } from "@mui/material";

const useStyles = makeStyles({
  root: {
    maxWidth: 310,
    transition: "transform 0.15s ease-in-out",
    "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
  },
});

export default function Recommendations() {
  const [loading,setLoading]=useState(true);
  const { recommendationsList } = getProjectsForDashboard();
  // var recommendationsList=undefined;/
  const classes = useStyles();
  useEffect(() => {
    console.log(recommendationsList);
    if(recommendationsList!==undefined && recommendationsList.length>0){
      setLoading(false)
    }
    else{
      setLoading(true)
    }
  }, [recommendationsList]);
  if(/* recommendationsList === undefined ||  */loading) return (
    <Container
        style={{ paddingLeft: "10%", paddingRight: "10%", paddingTop: "20px" }}
      >
        <Typography variant="h4" component="div" marginBottom="10px">
          Recommendations
          <br />
        </Typography>
    <Card
        // key={obj.projectName}
        sx={{ minWidth: 180 }}
        style={{
          display: "inline-block",
          width: "25%",
          marginLeft: "4%",
          marginRight: "4%",
          marginBottom: "30px",
          borderRadius: "13px",
          background: "linear-gradient(145deg, #e6e6e6, #ffffff)",
          boxShadow: "9px 9px 18px #e3e3e3, -9px -9px 18px #ffffff",
        }}
        className={classes.root}
      >
            <CardContent>
            <Skeleton
              animation="wave"
              height={30}
              width="40%"
              style={{ marginBottom: 6 }}
            />
              <Skeleton animation="wave" height={20} width="80%" style={{ marginBottom: "20px" }}/>
              <Skeleton animation="wave" height={20} width="30%" style={{ marginBottom: "12px" }}/>
              <Skeleton animation="wave" height={20} width="20%" style={{ marginBottom: "15px" }}/>
            </CardContent>
      </Card>
    <Card
        // key={obj.projectName}
        sx={{ minWidth: 180 }}
        style={{
          display: "inline-block",
          width: "25%",
          marginLeft: "4%",
          marginRight: "4%",
          marginBottom: "30px",
          borderRadius: "13px",
          background: "linear-gradient(145deg, #e6e6e6, #ffffff)",
          boxShadow: "9px 9px 18px #e3e3e3, -9px -9px 18px #ffffff",
        }}
        className={classes.root}
      >
            <CardContent>
            <Skeleton
              animation="wave"
              height={30}
              width="40%"
              style={{ marginBottom: 6 }}
            />
              <Skeleton animation="wave" height={20} width="80%" style={{ marginBottom: "20px" }}/>
              <Skeleton animation="wave" height={20} width="30%" style={{ marginBottom: "12px" }}/>
              <Skeleton animation="wave" height={20} width="20%" style={{ marginBottom: "15px" }}/>
            </CardContent>
      </Card>
    <Card
        // key={obj.projectName}
        sx={{ minWidth: 180 }}
        style={{
          display: "inline-block",
          width: "25%",
          marginLeft: "4%",
          marginRight: "4%",
          marginBottom: "30px",
          borderRadius: "13px",
          background: "linear-gradient(145deg, #e6e6e6, #ffffff)",
          boxShadow: "9px 9px 18px #e3e3e3, -9px -9px 18px #ffffff",
        }}
        className={classes.root}
      >
            <CardContent>
            <Skeleton
              animation="wave"
              height={30}
              width="40%"
              style={{ marginBottom: 6 }}
            />
              <Skeleton animation="wave" height={20} width="80%" style={{ marginBottom: "20px" }}/>
              <Skeleton animation="wave" height={20} width="30%" style={{ marginBottom: "12px" }}/>
              <Skeleton animation="wave" height={20} width="20%" style={{ marginBottom: "15px" }}/>
            </CardContent>
      </Card>
      </Container>
  )
  else return (
      //   <Box display="flex" justifyContent="center" alignItems="center" marginLeft="10%" marginRight="10%">
      <Container
        style={{ paddingLeft: "10%", paddingRight: "10%", paddingTop: "20px" }}
      >
        <Typography variant="h4" component="div" marginBottom="10px">
          Recommendations
          <br />
        </Typography>
        {recommendationsList.map((obj) => (
          <Card
            key={obj.projectName}
            sx={{ minWidth: 180 }}
            style={{
              display: "inline-block",
              width: "25%",
              marginLeft: "4%",
              marginRight: "4%",
              marginBottom: "30px",
              borderRadius: "13px",
              background: "linear-gradient(145deg, #e6e6e6, #ffffff)",
              boxShadow: "9px 9px 18px #e3e3e3, -9px -9px 18px #ffffff",
            }}
            className={classes.root}
          >
            <CardActionArea>
              <Link
                href={{
                  pathname: "/" + obj.assetId + "/" + obj.projectId,
                  query: {
                    projectRef: obj.projectId,
                  },
                }}
                as={`/${obj.assetId}/${obj.projectId}`}
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
                    sx={{ fontWeight: "bold", fontSize: 22 }}
                    color={"green"}
                  >
                    ₹{obj.currentPrice}
                  </Typography>
                </CardContent>
              </Link>
            </CardActionArea>
          </Card>
        ))}
      </Container>
    );
  ;
}
