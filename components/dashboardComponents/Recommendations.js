import { Card, CardContent, Typography, Box, Container, CardActionArea } from "@mui/material";
import { textAlign } from "@mui/system";
import { getProjectByDocIdRealTime, getProjectsForDashboard } from "../../backend/project";
import { useState } from "react";
import { makeStyles } from '@mui/styles';
import { useEffect } from "react";
import { async } from "@firebase/util";
import Link from "next/link";



const useStyles = makeStyles({
  root: {
    maxWidth: 310,
    transition: "transform 0.15s ease-in-out",
    "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
  }
});

export default function Recommendations() {
  const {recommendationsList} = getProjectsForDashboard()
  const classes = useStyles();
  useEffect(() => {
    console.log(recommendationsList)
  }, [recommendationsList]);
  if (recommendationsList!==undefined)
    return (
      //   <Box display="flex" justifyContent="center" alignItems="center" marginLeft="10%" marginRight="10%">
      <Container style={{ paddingLeft: "10%", paddingRight: "10%", paddingTop: "20px" }}>
        <Typography variant="h4" component="div" marginBottom="10px" >
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
              marginBottom: "10px"
            }}
            className={classes.root}
          >            
            <CardActionArea>
            <Link
                  href={{
                    pathname:
                      "/" + obj.assetId + "/" + obj.projectId,
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
                <Typography color="text.secondary" sx={{ fontWeight: '700', marginBottom: "15px" }}>{obj.assetName}</Typography>
                <Typography color="text.secondary" style={{ fontSize: "10px" }} sx={{ fontWeight: '650' }}>
                  Current Price
                </Typography>
                <Typography sx={{ fontWeight: 'bold', fontSize: 20 }} color={"green"}>₹{obj.currentPrice}</Typography>
              </CardContent>
              </Link>
            </CardActionArea>
          </Card>
        ))}
      </Container>
    );
  else return(<h1>Loading</h1>);
}
