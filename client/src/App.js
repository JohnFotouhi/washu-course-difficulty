import * as React from 'react';
import { useEffect } from 'react';
import Header from './header';
import EvaluationContainer from './evaluationContainer';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';

/**
 * TODO: Some course and professor names have weird spacing issues
 * 
 * TODO: Add Olin courses?
 * 
 * TODO: Make search inputs collabsible
 * 
 * TODO: Add More Courses
 * 
 * TODO: Move to public Github Repo
 * 
 * TODO: Secure database credentials
 * 
 * Todo: Improve SEO (I want it on first page of relevant searches)
 * 
 * TODO: Create ad space
 * 
 * TODO: Improve look
 * 
 * TODO: Create Github Todo List
 * 
 * TODO: Create unique URL
 * 
 * TODO: Add link to repo on site
 */

// Call API to query courses and show results to user
const searchCourses = (courseData, sortOption, evaluators, setResults) => {
  fetch("/queryCourses", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      courseData: courseData,
      sortOption: sortOption,
      evaluators: evaluators
    })
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    setResults(data);
  });
}

// Get 10 random courses
async function getRandomCourses(set) {
    fetch("/getRandom")
    .then((res) => res.json())
    .then((data) => {
      set(data.courses);
    });
}

function App() {
  const [evals, setEvals] = React.useState([]);
  // Show 10 random courses to the user initially
  useEffect(() => {
    getRandomCourses(setEvals);
  }, [])
  
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <AppBar position="sticky"><Toolbar>
          <Box
            component="img"
            sx={{
              height: 50,
              width: 50,
              mr: 2
            }}
            alt="WashU Logo"
            src="washulogo.png"
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: "Libre Baskerville" }} > WashU Course Difficulties</Typography>
      </Toolbar></AppBar>
      <Header handleSubmit={searchCourses} setResults={setEvals} sx={{px:4}}/>
      <EvaluationContainer evals={evals} sx={{mx:12}}/>
    </LocalizationProvider>
  );
}

export default App;