import React from "react";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { faFontAwesome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
// import faF
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

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

function FooterComponent() {
  return (
    <Container
      maxWidth="100%"
      component="footer"
      sx={{
        mt: 8,
        py: [3, 6],
      }}
      style={{ backgroundColor: "#c2e5dd" }}
    >
      <Grid container spacing={4} justifyContent="space-evenly">
        <Grid item xs={6} sm={3} key="InvestInYou">
          <Typography
            variant="h5"
            color="text.primary"
            style={{ fontWeight: "600", fontSize: "28px" }}
            gutterBottom
          >
            InvestInYou
          </Typography>
          <p style={{ textAlign: "justify" }}>
            Invest in You have much planned for the future, working with great
            clients and continued Stock Investment. If you’d like to join our
            team.
          </p>
        </Grid>
        {footers.map((footer) => (
          <Grid item xs={6} sm={3} key={footer.title}>
            <Typography
              variant="h6"
              style={{ fontWeight: "600" }}
              color="text.primary"
              gutterBottom
            >
              {footer.title}
            </Typography>
            <ul style={{ listStyle: "none", paddingLeft: "10px" }}>
              {footer.description.map((item) => (
                <li key={item} style={{ cursor: "pointer" }}>
                  {/* <Link href="#" variant="subtitle1" color="text.secondary"> */}
                  {item}
                  {/* </Link> */}
                </li>
              ))}
            </ul>
          </Grid>
        ))}
      </Grid>
      <div
        style={{ marginRight: "auto", marginLeft: "auto",marginBottom:"20px",width:"min-content" }}
      >
        <ul className="wrapper">
          <li className="icon facebook">
            <span className="tooltip">Facebook</span>
            <span>
              <FontAwesomeIcon icon={faFacebookF}></FontAwesomeIcon>
            </span>
          </li>
          <li className="icon twitter">
            <span className="tooltip">Twitter</span>
            <span>
              <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
            </span>
          </li>
          <li className="icon instagram">
            <span className="tooltip">Instagram</span>
            <span>
              <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
            </span>
          </li>
          <li className="icon github">
            <span className="tooltip">Github</span>
            <span>
              <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
            </span>
          </li>
          <li className="icon youtube">
            <span className="tooltip">Youtube</span>
            <span>
              <FontAwesomeIcon icon={faYoutube}></FontAwesomeIcon>
            </span>
          </li>
        </ul>
      </div>
      <div
        style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}
      >
        <Typography style={{ marginLeft: "5px", display: "inline" }}>
          <b>&#169; InvestInYou</b>
        </Typography>
      </div>
    </Container>
  );
}

export default FooterComponent;
