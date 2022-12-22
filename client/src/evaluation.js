import React from "react";
import './App.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';


const DifficultyBar = styled(LinearProgress)(({ theme }) => ({
    height: 20,
    borderRadius: 0,
    length: 10
}));

const infoText = `Difficulties are based on WashU course evaluations. For Engineering courses, difficulties are calculated based on grade distributions. For other courses, students rate how difficult the course is compared to other courses. All ratings are from 1 (easiest) to 5 (hardest).`;
function InfoTooltip() {
    return (
      <Tooltip title={infoText}>
        <IconButton>
          <InfoIcon />
        </IconButton>
      </Tooltip>
    );
}

const Evaluation = ({ evaluation }) => {

    const card = (
        <React.Fragment>
            <CardContent >
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <Typography variant="h5" component="div" sx={{ fontSize: 20 }}>{evaluation.name}</Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{evaluation.department + " " + evaluation.code + "." + evaluation.section + "  -  " + evaluation.semester + " " + evaluation.year}</Typography>
                    </Grid>
                    <Grid item xs={4} style={{textAlign: "center"}}>
                        <Typography variant="h5" component="div" sx={{ fontSize: 20 }}>Difficulty{InfoTooltip()} - {evaluation.difficulty.toFixed(2)}</Typography>
                        <div><DifficultyBar variant="determinate" value={evaluation.difficulty / 0.05} /></div>
                    </Grid>
                    <Grid item xs={4} style={{textAlign: "center"}}>
                        <Typography variant="h5" component="div" sx={{ fontSize: 20 }}>Number of Evaluators</Typography>
                        <Typography variant="h5" component="div" sx={{ fontSize: 20 }}>{evaluation.review_count}</Typography>
                    </Grid>
                    <Grid item xs={4} style={{textAlign: "center"}}>
                        <Typography variant="h5" component="div" sx={{ fontSize: 20}}>Professor</Typography>
                        <Typography variant="h5" component="div" sx={{ fontSize: 20 }}>{evaluation.professor}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </React.Fragment>
    )

    return (
        <>
            <Card variant="outlined" sx={{ m: 2, backgroundColor: "rgb(240, 240, 240)"}}>{card}</Card>
        </>
    );
}

export default Evaluation;