import React, { useEffect, useState } from "react";
import {Typography } from "@mui/material";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Zoom from "@mui/material/Zoom";
import Slide from "@mui/material/Slide";
import { Button } from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import styled, { ThemeProvider } from "styled-components";
import NoSsr from "@mui/material/NoSsr";
import Link from "next/link";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { deepPurple } from "@mui/material/colors";


const customTheme = createTheme({
  palette: {
    primary: {
      main: deepPurple[500],
    },
  },
  typography: {
    "fontFamily": `"Poppins", "sans-serif" ,"Roboto","Arial"`,
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
   }
});

// export function ScrollTop(props) {
//   const { children, window } = props;
//   // Note that you normally won't need to set the window ref as useScrollTrigger
//   // will default to window.
//   // This is only being set here because the demo is in an iframe.
//   const trigger = useScrollTrigger({
//     target: window ? window() : undefined,
//     disableHysteresis: true,
//     threshold: 100,
//   });

//   const handleClick = (event) => {
//     const anchor = (event.target.ownerDocument || document).querySelector(
//       "#back-to-top-anchor"
//     );

//     if (anchor) {
//       anchor.scrollIntoView({
//         behavior: "smooth",
//         block: "center",
//       });
//     }
//   };

//   return (
//     <Zoom in={trigger}>
//       <Box
//         onClick={handleClick}
//         role="presentation"
//         sx={{ position: "fixed", bottom: 16, right: 16 }}
//       >
//         {children}
//       </Box>
//     </Zoom>
//   );
// }
const StyledTypography = styled(Typography)`
  ${({ theme }) => `
  cursor: pointer;
  color: black;
  // width:160px;
  font-weight:600;
  transition: ${theme.transitions.create(["transform"], {
    duration: theme.transitions.duration.standard,
  })};
  &:hover {
    transform: scale(1.1);
  }
  `}
`;

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
// ScrollTop.propTypes = {
//   children: PropTypes.element.isRequired,
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window: PropTypes.func,
// };
export function AppBarComponent(props) {
  return (
    <Container>
      <HideOnScroll {...props}>
        <AppBar sx={{paddingTop: "10px", paddingBottom: "10px", backgroundColor: "white", boxShadow: "0px 1px 0px #f2f2f2"}}>
          <Toolbar>
            <Link href="/dashboard">
            <Typography variant="h6" component="div" sx={{color: "blue" }}>
              InvestInYou
            </Typography>
            </Link>
            <NoSsr>
              <MuiThemeProvider theme={customTheme}>
                <ThemeProvider theme={customTheme}>
                  <StyledTypography
                    component="div"
                    sx={{ marginLeft: "auto", color: "black",marginRight:"30px" }}
                  >
                    About Us
                  </StyledTypography>
                  <StyledTypography
                    component="div"
                    sx={{
                      color: "black",
                      marginRight: "20px" /* marginLeft:"auto" */,
                    }}
                  >
                    Talk To Out Experts
                  </StyledTypography>
                </ThemeProvider>
              </MuiThemeProvider>
            </NoSsr>
            {/* <Button
              href={props.path}
              style={{
                marginLeft:"auto" ,float:"right" color: "black",
              }}
            >
              {props.pathname}
            </Button> */}
            <a href={props.path}>
            <div className="buttons">
  <button className="blob-btn">
    {props.pathname}
    <span className="blob-btn__inner">
      <span className="blob-btn__blobs">
        <span className="blob-btn__blob"></span>
        <span className="blob-btn__blob"></span>
        <span className="blob-btn__blob"></span>
        <span className="blob-btn__blob"></span>
      </span>
    </span>
  </button>
  <br/>
</div>
</a>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      {/* <ScrollTop {...props}>
      <Fab color="secondary" size="small" aria-label="scroll back to top">
        <KeyboardArrowUpIcon />
      </Fab>
    </ScrollTop> */}
    </Container>
  );
}
export default AppBarComponent;
