import React, { useState, useEffect } from "react";
import { assetsForDashboard } from "../../backend/asset";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Container,
  CardActionArea,
  Skeleton
} from "@mui/material";
import Link from "next/link";
import { makeStyles } from "@mui/styles";
import { Padding } from "@mui/icons-material";



const useStyles = makeStyles({
    root: {
      maxWidth: 310,
      transition: "transform 0.15s ease-in-out",
      "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
    },
  });

function AssetRecommendations() {
  const classes = useStyles();

  const [assetList, setAssetList] = useState();
  useEffect(async () => {
    // console.log(await assetsForDashboard())
    const list = await assetsForDashboard();
    if (list && list !== []) {
      setAssetList(list);
    }
  }, []);
//   if (assetList)
    return (
      <Container
        style={{
          paddingLeft: "10%",
          paddingRight: "10%",
          paddingTop: "20px",
          marginBottom:"30px"
          //   marginTop: "600px",
        }}
      >
        <Typography variant="h4" component="div">
          Asset Recommendations
        </Typography>
        <div className="assetContainer">
            {!assetList||assetList===[]?
            
            <>
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
              marginTop: "20px",
            //   height:"500px",
              padding:"0"
            }}
            className={classes.root}
          >
                <CardContent >
                <Skeleton
                  animation="wave"
                  height={200}
                  width="100%"
                  style={{ margin:"0"}}
                />
                  <Skeleton animation="wave" height={20} width="80%" style={{ /* marginBottom: "20px" */ }}/>
                  {/* <Skeleton animation="wave" height={20} width="30%" style={{ marginBottom: "12px" }}/> */}
                  <Skeleton animation="wave" height={20} width="20%" style={{/*  marginBottom: "15px"  */}}/>
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
              marginTop: "20px",
            //   height:"500px",
              padding:"0"
            }}
            className={classes.root}
          >
                <CardContent >
                <Skeleton
                  animation="wave"
                  height={200}
                  width="100%"
                  style={{ margin:"0"}}
                />
                  <Skeleton animation="wave" height={20} width="80%" style={{ /* marginBottom: "20px" */ }}/>
                  {/* <Skeleton animation="wave" height={20} width="30%" style={{ marginBottom: "12px" }}/> */}
                  <Skeleton animation="wave" height={20} width="20%" style={{/*  marginBottom: "15px"  */}}/>
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
              marginTop: "20px",
            //   height:"500px",
              padding:"0"
            }}
            className={classes.root}
          >
                <CardContent >
                <Skeleton
                  animation="wave"
                  height={200}
                  width="100%"
                  style={{ margin:"0"}}
                />
                  <Skeleton animation="wave" height={20} width="80%" style={{ /* marginBottom: "20px" */ }}/>
                  {/* <Skeleton animation="wave" height={20} width="30%" style={{ marginBottom: "12px" }}/> */}
                  <Skeleton animation="wave" height={20} width="20%" style={{/*  marginBottom: "15px"  */}}/>
                </CardContent>
          </Card>
          </>
            
            :<section style={{ marginTop: "20px" }} className="cards">
            {assetList.map((asset) => {
              return (
                <article
                key={asset.contact}
                  style={{ backgroundImage: `url(${asset.photoURL})`,cursor:"pointer",marginRight:"10px",marginLeft:"10px" }}
                  className="card card--1"
                >
                  <div className="card__info-hover">
                    <svg className="card__like" viewBox="0 0 24 24">
                      <path
                        fill="#000000"
                        d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z"
                      />
                    </svg>
                    <div className="card__clock-info">
                      <svg className="card__clock" viewBox="0 0 24 24">
                        <path d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z" />
                      </svg>
                      <span className="card__time">15 min</span>
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundImage: `url(${asset.photoURL})` /* ,height:"200px",width:"300px" */,
                    }}
                    className="card__img"
                  ></div>
                  {/* {console.log(asset.id)} */}
                  <Link
                    href={{
                      pathname: "/" + asset.name,
                      query: {
                        assetRef: asset.assetId,
                      },
                    }}
                    as={`/${asset.assetId}`}
                    className="card_link"
                  >
                    <div
                      style={{
                        backgroundImage: `url(${asset.photoURL})` /* ,height:"200px",width:"300px" */,
                      }}
                      className="card__img--hover"
                    ></div>
                  </Link>
                  <div className="card__info">
                    {/* <span className="card__category"> Recipe</span> */}
                    <h3 className="card__title">{asset.name}</h3>
                    <span className="card__by">
                      Profession{" "}
                      <Link
                        href={{
                          pathname: "/" + asset.name,
                          query: {
                            assetRef: asset.assetId,
                          },
                        }}
                        as={`/${asset.assetId}`}
                        className="card__author"
                        title="author"
                      >
                        {asset.profession}
                      </Link>
                    </span>
                  </div>
                </article>
              );
            })}
          </section>}
          
        </div>
      </Container>
    );
//   else return <h1>Loading...</h1>;
}

export default AssetRecommendations;
