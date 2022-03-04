import { Card, CardContent, Typography } from "@mui/material";
import { textAlign } from "@mui/system";
import { getProjectsForDashboard } from "../../backend/project";

export default function Recommendations(){
    const { recommendationsList } = getProjectsForDashboard()
    if(recommendationsList) return (
        recommendationsList.map((obj)=>
            <Card key={obj.projectName} sx={{ minWidth:180 }} style={{display:"inline-block" ,width:"25%",marginLeft:"3%",marginRight:"3%"}}>
                <CardContent>
                    <Typography style={{fontWeight:"bolder"}}>
                        {obj.projectName}
                    </Typography>
                    <Typography color="text.secondary">
                        {obj.assetName}
                    </Typography>
                    <Typography color="text.secondary" style={{fontSize:"10px"}}>
                        Current Price
                    </Typography>
                    <Typography color={"green"}>
                    ₹ {obj.currentPrice}
                    </Typography>
                </CardContent>
            </Card>
        )
    )
    else (
        ""
    )
}