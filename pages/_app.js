import "../styles/globals.css";
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';
import Slide from '@mui/material/Slide';
import { ThemeProvider, createTheme } from "@mui/material/styles";
// import Button from "@material-ui/core/Button";

const themeLight = createTheme({
  palette: {
    background: {
      default: "#e5e5e5"
    }
  }
});

// const themeDark = createTheme({
//   palette: {
//     background: {
//       default: "#222222"
//     },
//     text: {
//       primary: "#ffffff"
//     }
//   }
// });

// const App = () => {
//   const [light, setLight] = React.useState(true);
//   return (
//     <MuiThemeProvider theme={light ? themeLight : themeDark}>
//       <CssBaseline />
//       <Button onClick={() => setLight(prev => !prev)}>Toggle Theme</Button>
//     </MuiThemeProvider>
//   );
// };


function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

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

function MyApp({ Component, pageProps,props }) {
  return (
    <ThemeProvider theme={themeLight}>
      <CssBaseline />
    {/* <Container style={{backgroundColor:"#E5E5E5" }}> */}
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div">
              InvestInYou
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Container  style={{backgroundColor:"#E5E5E5" /* ,width:"100%" , margin:"0 0 0 0"  ,paddingLeft:"0px",paddingRight:"0px",right:"0" */}}>
      <Toolbar id="back-to-top-anchor" />
        <Box sx={{ my: 2 }}>
          <Component {...pageProps} />
        </Box>
      </Container>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      {/* </Container> */}
    </ThemeProvider>
  );
}

export default MyApp;
