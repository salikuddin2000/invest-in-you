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
      <Box sx={{ marginTop: "80px", paddingLeft: "7%", paddingRight: "7%" }}>
        {assetInfo ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap" /* ,flexDirection:"column" */,
            }}
          >
            <img
              src={assetInfo.photoURL}
              style={{ height: "40vh" /* ,maxWidth:"50vh",flexBasis:"50%" */ }}
            />
            <div style={{ flexBasis: "50%", marginLeft: "30px" }}>
              <h1 /*  style={{display:"inline"}} */>{assetInfo.name}</h1>
              <h2 style={{ color: "grey", fontWeight: "600" }}>
                General Profile
              </h2>
              <h3 style={{ color: "grey", fontWeight: "500" }}>
                <b>Short Bio:</b> {assetInfo.description}
              </h3>
              <h3 style={{ color: "grey", fontWeight: "500" }}>
                <b>Profession:</b> {assetInfo.Profession}
              </h3>
            </div>
          </div>
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
        <div class="content-column price-block col-lg-4 col-md-2 col-sm-12">
          <div class="inner-box">
            <div
              class="packge-plan"
              /* style="background-image:url('images/resource/price-shape.png');" */
            >
              <h6>Know More?</h6>
              <div class="price">Contact Us</div>
              <span class="plan-text">for custom Support</span>
            </div>
            <div class="list-packges-area">
              <ul class="price-list">
                <li class="active">Industry Selection</li>
                <li class="active">Project Identification</li>
                <li class="active">Stock Analysis</li>
              </ul>
              <div class="buy-btn-area text-left">
                <a href="#" class="theme-btn btn-style-two buy-btn">
                  <span class="txt">Call Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Box>
      {/* <footer class="main-footer style-three" style="background-color: #c2e5dd; margin-top: -100px;">
            <div class="auto-container">
                <div class="widgets-section">
                    <div class="row">
                        <div class="big-column col-xl-4 col-lg-12 col-md-12 col-sm-12">
                            <div class="row">
                                <div class="footer-column col-xl-8 col-lg-6 col-md-6 col-sm-12">
                                    <div class="footer-widget about-widget">
                                        <div class="footer-logo">
                                            <figure>
                                                <a href="index.html"><img src="images/logo.png" alt="" /></a>
                                            </figure>
                                        </div>
                                        <div class="widget-content">
                                            <p>Invest in You have much planned for the future, working with great clients and continued Stock Investment. If you’d like to join our team.</p>
                                            <ul class="social-icon-two">
                                                <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                                <li><a href="#"><i class="fab fa-pinterest-p"></i></a></li>
                                                <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="big-column col-xl-8 col-lg-12 col-md-12 col-sm-12">
                            <div class="row clearfix">
                                <div class="footer-column col-xl-5 col-lg-6 col-md-6 col-sm-12">
                                    <div class="footer-widget links-widget">
                                        <h4 class="widget-title">Quick links</h4>
                                        <div class="widget-content">
                                            <ul class="list">
                                                <li><a href="#">Vision & Values</a></li>
                                                <li><a href="#">Careers</a></li>
                                                <li><a href="#">Services</a></li>
                                            </ul>
                                            <ul class="list">
                                                <li><a href="#">Awards</a></li>
                                                <li><a href="#">Media</a></li>
                                                <li><a href="#">Contact</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="footer-column col-xl-7 col-lg-6 col-md-6 col-sm-12">
                                    <div class="footer-widget links-widget">
                                        <h4 class="widget-title">Useful links</h4>
                                        <div class="widget-content">
                                            <ul class="list">
                                                <li><a href="#">Vision & Values</a></li>
                                                <li><a href="#">Careers</a></li>
                                                <li><a href="#">Services</a></li>
                                            </ul>
                                            <ul class="list">
                                                <li><a href="#">Awards</a></li>
                                                <li><a href="#">Media</a></li>
                                                <li><a href="#">Contact</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <div class="auto-container" style="max-width: 100%; padding: 0px;">
                    <div class="inner-container clearfix">
                        <div class="copyright-text">
                            <p>Copyright © 2021 Invest in You. All right reserved</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer> */}
    </>
  );
}

export default Assetpage;
