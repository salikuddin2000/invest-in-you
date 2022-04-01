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
import { buy, sell } from "../../backend/transaction";
import { useUser } from "../../firebase/useUser";
import { checkUserHolding } from "../../backend/user";
import { userDetails } from "../../backend/user";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { async } from "@firebase/util";

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
  const [checkForSell, setCheckForSell] = useState(false);
  const [check, setCheck] = useState(false);
  const { user } = useUser();
  const { userData } = userDetails(user.email);
  const { priceList, timeList } = projectLiveValuesForGraph(
    props.projectRef.projectId
  );
  const { project } = getProjectByDocId(props.projectRef.projectId);
  const [sellOpen, setSellOpen] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);
  const [buyQuantity, setBuyQuantity] = useState(0);
  const [sellQuantity, setSellQuantity] = useState(0);
  const [holdingQuantity, setHoldingQuantity] = useState(0);
  const handleSellOpen = () => setSellOpen(true);
  const handleSellClose = () => setSellOpen(false);
  const handleBuyOpen = () => setBuyOpen(true);
  const handleBuyClose = () => setBuyOpen(false);

  const handleBuyChange = (event) => {
    setBuyQuantity(event.target.value);
  };
  const handleSellChange = (event) => {
    setSellQuantity(event.target.value);
  };
  useEffect(() => {
    console.log(buyQuantity);
    console.log(sellQuantity);
  }, [buyQuantity, sellQuantity]);

  useEffect(async () => {
    console.log("check");
    if (userData) {
      console.log(userData);
      let checkHolding = await checkUserHolding(
        userData.id,
        props.projectRef.projectId
      );
      console.log(checkHolding);
      if (checkHolding === false) {
        setCheck(checkHolding);
        setHoldingQuantity(0);
      } else {
        setCheck(true);
        console.log(checkHolding);
        setHoldingQuantity(parseInt(checkHolding));
      }
    }
  }, [userData, checkForSell]);
  return (
    <>
      <div>Project Page</div>
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
          ],
        }}
      />
      <Button onClick={handleBuyOpen}>Buy</Button>
      <Modal
        keepMounted
        open={buyOpen}
        onClose={handleBuyClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Enter quantity
          </Typography>
          <TextField
            label="Enter quantity"
            onChange={handleBuyChange}
            name="numberformat"
            id="formatted-numberformat-input"
            variant="standard"
          />
          {console.log(userData)}
          {project ? <h3>Rs{project.currentPrice * buyQuantity}</h3> : ""}
          {userData &&
          userData.data.credit < project.currentPrice * buyQuantity ? (
            <Alert severity="error">
              <AlertTitle>Insufficient Credit</AlertTitle>
              Credit: <strong>Rs{userData.data.credit}</strong>
            </Alert>
          ) : (
            <Button
              onClick={async () => {
                await buy(
                  props.projectRef.projectId,
                  user.email,
                  parseInt(buyQuantity)
                ),
                  setCheckForSell(!checkForSell),
                  setBuyOpen(false)
              }}
            >
              Buy
            </Button>
          )}
        </Box>
      </Modal>
      {check ? <Button onClick={handleSellOpen}>sell</Button> : ""}
      <Modal
        keepMounted
        open={sellOpen}
        onClose={handleSellClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Enter quantity
          </Typography>

          <TextField
            label="Enter quantity"
            onChange={handleSellChange}
            name="numberformat"
            id="formatted-numberformat-input"
            variant="standard"
          />
          {holdingQuantity < sellQuantity ? (
            <Alert severity="error">
              <AlertTitle>Insufficient Holdings</AlertTitle>
              Holdings: <strong>{holdingQuantity}</strong>
            </Alert>
          ) : (
            <Button
              onClick={async () => {
                await sell(
                  user.email,
                  props.projectRef.projectId,
                  parseInt(sellQuantity)
                ),
                  setCheckForSell(!checkForSell),
                  setSellOpen(false)
              }}
            >
              Sell
            </Button>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default ProjectPage;
