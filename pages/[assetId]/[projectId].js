import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { getProjectByDocId, projectLiveValuesForGraph } from "../../backend/project";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
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
  const {priceList, timeList} = projectLiveValuesForGraph(props.projectRef.projectId)
  // const router = useRouter()
  const { project } = getProjectByDocId(props.projectRef.projectId);
  // const projectId = router.query.projectId
  useEffect(() => {
    console.log(priceList);
  }, [priceList]);
  // console.log(props)
  return (
    <>
      <div>Project Page{/* {[projectId]} */}</div>
      <Line style={{maxWidth:"500px",maxHeight:"300px"}}
        data={{
          labels: timeList?timeList:[],
          datasets: [
            {
              label: "Live Price",
              data: priceList?priceList:[],
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
    </>
  );
}

export default ProjectPage;
