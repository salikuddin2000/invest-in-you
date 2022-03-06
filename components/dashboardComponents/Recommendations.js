import { Card, CardContent, Typography, Box, Container, CardActionArea } from "@mui/material";
import { textAlign } from "@mui/system";
import { getProjectsForDashboard } from "../../backend/project";

export default function Recommendations() {
  const { recommendationsList } = getProjectsForDashboard();
  if (recommendationsList)
    return (
      //   <Box display="flex" justifyContent="center" alignItems="center" marginLeft="10%" marginRight="10%">
      <Container style={{ paddingLeft: "10%", paddingRight: "10%",paddingTop:"20px" }}>
        <Typography variant="h4" component="div"  marginBottom="10px" >
          Recommendations
          <br />
        </Typography>
        {recommendationsList.map((obj) => (
          <Card
            key={obj.projectName}
            sx={{ minWidth: 180 }}
            style={{
              display: "inline-block",
              width: "25%",
              marginLeft: "4%",
              marginRight: "4%",
              marginBottom:"10px"
            }}
          >
              <CardActionArea>
            <CardContent>
              <Typography variant="h5" style={{ fontWeight: "bolder" }}>
                {obj.projectName}
              </Typography>
              <Typography color="text.secondary" sx={{ fontWeight: '700', marginBottom:"15px"}}>{obj.assetName}</Typography>
              <Typography color="text.secondary" style={{ fontSize: "10px" }} sx={{ fontWeight: '650' }}>
                Current Price
              </Typography>
              <Typography sx={{ fontWeight: 'bold', fontSize: 20 }} color={"green"}>₹{obj.currentPrice}</Typography>
            </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Container>
    );
  else "";
}
