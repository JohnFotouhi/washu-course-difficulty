import React from "react";
import { Box } from "@mui/material";
import Evaluation from "./evaluation";

const EvaluationContainer = ( {evals} ) => {
    console.log(evals);    
    return (
        <>
            <Box sx={{mx: 4}}>
                {evals.map(function(evaluation, index){
                    return(
                        <Evaluation key={index} evaluation={evaluation}/>
                    );
                })}
            </Box>
        </>
    );
}

export default EvaluationContainer;