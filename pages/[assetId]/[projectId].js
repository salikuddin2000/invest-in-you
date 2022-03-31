import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  getProjectByDocId,
  projectLiveValuesForGraph,
} from "../../backend/project";
// import PropTypes from 'prop-types';
// import NumberFormat from 'react-number-format';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { buy } from "../../backend/transaction";
import { useUser } from "../../firebase/useUser";
import { checkUserHolding } from "../../backend/user";
import { userDetails } from "../../backend/user";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};


// const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
//   const { onChange, ...other } = props;

//   return (
//     <NumberFormat
//       {...other}
//       getInputRef={ref}
//       onValueChange={(values) => {
//         onChange({
//           target: {
//             name: props.name,
//             value: values.value,
//           },
//         });
//       }}
//       thousandSeparator
//       isNumericString
//       prefix="$"
//     />
//   );
// });

// NumberFormatCustom.propTypes = {
//   name: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
// };

// import { Chart }            from 'react-chartjs-2'

// const data = {
//   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//   datasets: [
//     {
//       label: "Live Price",
//       data: [33, 53, 85, 41, 44, 65],
//       fill: true,
//       backgroundColor: "rgba(75,192,192,0.2)",
//       borderColor: "rgba(75,192,192,1)",
//     },
//     // {
//     //   label: "Second dataset",
//     //   data: [33, 25, 35, 51, 54, 76],
//     //   fill: false,
//     //   borderColor: "#742774"
//     // }
//   ],
// };

export async function getServerSideProps(context) {
  console.log(context.query);
  // returns { id: episode.itunes.episode, title: episode.title}
  //you can make DB queries using the data in context.query
  return {
    props: {
      projectRef: context.query /* .projectRef */, //pass it to the page props
    },
  };
}
function ProjectPage(props) {
  const [checkForSell, setCheckForSell] = useState();
  const [check, setCheck] = useState(false);
  const { user } = useUser();
  const { userData } = userDetails(user.email);
  const { priceList, timeList } = projectLiveValuesForGraph(
    props.projectRef.projectId
  );
  // const router = useRouter()
  const { project } = getProjectByDocId(props.projectRef.projectId);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const projectId = router.query.projectId
  // useEffect(() => {
  //   console.log(priceList);
  // }, [priceList]);

  useEffect(async () => {
    console.log("check");
    if (userData && !check) {
      console.log(userData);
      let checkHolding = await checkUserHolding(
        userData.id,
        props.projectRef.projectId
      );
      console.log(checkHolding);
      setCheck(checkHolding);
    }
  }, [userData, checkForSell]);
  // console.log(props)
  return (
    <>
      <div>Project Page{/* {[projectId]} */}</div>
      <Line
        style={{ maxWidth: "500px", maxHeight: "300px" }}
        data={{
          labels: timeList ? timeList : [],
          datasets: [
            {
              label: "Live Price",
              data: priceList ? priceList : [],
              fill: true,
              backgroundColor: "rgba(75,192,192,0.2)",
              borderColor: "rgba(75,192,192,1)",
            },
            // {
            //   label: "Second dataset",
            //   data: [33, 25, 35, 51, 54, 76],
            //   fill: false,
            //   borderColor: "#742774"
            // }
          ],
        }}
      />
      <button
        onClick={async () => {
          await buy("OjYummCSOLkwpD1CsZNy", "infinitybusiness726@gmail.com", 4),
            setCheckForSell(!checkForSell);
        }}
      >
        Buy
      </button>
      {check ? <Button onClick={handleOpen}>sell</Button> : ""}
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Enter quantity
          </Typography>
          <TextField
            label="Enter quantity"
            // value={values.numberformat}
            // onChange={handleChange}
            name="numberformat"
            id="formatted-numberformat-input"
            // InputProps={{
            //   inputComponent: NumberFormatCustom,
            // }}
            variant="standard"
          />
          {/* <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
    </>
  );
}

export default ProjectPage;
