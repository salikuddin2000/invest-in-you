import React,{useEffect,useState} from 'react'
import { Typography } from '@mui/material';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';
import Slide from '@mui/material/Slide';
import { Button } from "@mui/material";
import useScrollTrigger from '@mui/material/useScrollTrigger';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


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
export function AppBarComponent(props){

return(
  <Container>

    <HideOnScroll {...props}>
    <AppBar>
      <Toolbar>
        <Typography variant="h6" component="div">
          InvestInYou
        </Typography>
        <Button href={props.path} style={{marginLeft:"auto"/* ,float:"right" */,color:"white"}}>{props.pathname}</Button>
      </Toolbar>
    </AppBar>
  </HideOnScroll>
      {/* <ScrollTop {...props}>
      <Fab color="secondary" size="small" aria-label="scroll back to top">
        <KeyboardArrowUpIcon />
      </Fab>
    </ScrollTop> */}
</Container>
)
}
export default AppBarComponent