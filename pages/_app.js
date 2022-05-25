import "../styles/globals.css";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "../styles/button.css";
import "../styles/loader.css";
import "../styles/assetCard.css";
import "../styles/socialIcons.css";
import "../styles/projectCard.css";


// import Button from "@material-ui/core/Button";

const themeLight = createTheme({
  palette: {
    background: {
      // default: "#e5e5e5"
    },
  },
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

function MyApp({ Component, pageProps, props }) {
  return (
    <ThemeProvider theme={themeLight}>
      <CssBaseline />
      {/* <Container style={{backgroundColor:"#E5E5E5" }}> */}

      {/* <Container>
      {/* <Toolbar id="back-to-top-anchor" /> */}
      {/* <Box sx={{ my: 2 }}> */}
      <Component {...pageProps} />
      {/* </Box> */}
      {/* </Container> */}

      {/* </Container> */}
    </ThemeProvider>
  );
}

export default MyApp;
