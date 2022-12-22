import React from "react";
import './App.css';
import Button from '@mui/material/Button'; 
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
import {InputLabel, FormControl, MenuItem, TextField, Autocomplete, Grid, Box, FormControlLabel, RadioGroup, Radio} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers';
import CircularProgress from '@mui/material/CircularProgress';


const Header = ( {handleSubmit, setResults} ) => {
    const [courseNames, setCourseNames] = React.useState(["Example..."]);
    const [departments, setDepartments] = React.useState(["Example..."]);
    const [professors, setProfessors] = React.useState(["Example..."]);
    const [semester, setSemester] = React.useState("Any");
    const [school, setSchool] = React.useState("Any");
    const [name, setName] = React.useState("Any");
    const [professor, setProfessor] = React.useState("Any");
    const [department, setDepartment] = React.useState("Any");
    const [code, setCode] = React.useState("Any");
    const [section, setSection] = React.useState(0);
    const [year, setYear] = React.useState(null);
    const [sortOption, setSortOption] = React.useState("ASCENDING");
    const [evaluators, setEvaluators] = React.useState(0);

    // Takes course information and sets the list for the autocomplete fields
    function setCourses(data){
        console.log(data);
        if(typeof(data.names) != "undefined" && data.names != null){
            let names = data.names.map(obj => obj.name);
            names.push("Any");
            setCourseNames(names);
        }
        if(typeof(data.departments) != "undefined" && data.departments != null){
            let depts = data.departments.map(obj => obj.department);
            depts.push("Any");
            setDepartments(depts);
        }
        if(typeof(data.professors) != "undefined" && data.professors != null){
            let profs = data.professors.map(obj => obj.professor);
            profs.push("Any");
            setProfessors(profs);
        }
    }

    // Gets 10 random courses and shows them to the user on first render
    React.useEffect(() => {
    fetch("/getUniqueCourseInfo")
        .then((res) => res.json())
        .then((data) => setCourses(data));
    }, []);

    // Creates circular progress for search button
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef();

    React.useEffect(() => {
        return () => {
          clearTimeout(timer.current);
        };
    }, []);

    const handleButtonClick = () => {
        if (!loading) {
          setSuccess(false);
          setLoading(true);
          timer.current = window.setTimeout(() => {
            setSuccess(true);
            setLoading(false);
          }, 2000);
        }
    };

    return (
        <>
        <Box p={1} pt={3} sx={{ mx: 2}}>  
            <Grid container spacing={1}>
                <Grid item xs={8} >
                    <Autocomplete
                        size="small"
                        sx={{ backgroundColor: "white", borderRadius: "5px",}}
                        disablePortal
                        id="course-name"
                        options={courseNames}
                        value={name}
                        onChange={(event, newValue) => {
                            setName(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} label="Course Name" />}
                    />
                </Grid>
                <Grid item xs={4} >
                    <Autocomplete
                        size="small"
                        sx={{ backgroundColor: "white", borderRadius: "5px"}}
                        disablePortal
                        id="course-professor"
                        options={professors}
                        renderInput={(params) => <TextField {...params} label="Professor" />}
                        value={professor}
                        onChange = {(event, newValue) => {
                            setProfessor(newValue);
                        }}
                    />
                </Grid>
                <Grid item xs={2.5} >
                    <FormControl fullWidth>
                    <InputLabel id="school-select-label">School</InputLabel>
                    <Select
                        size="small"
                        sx={{ backgroundColor: "white", borderRadius: "5px"}}
                        labelId="school-select-label"
                        id="school-select"
                        value={school}
                        label="School"
                        onChange={(event, newValue) => {
                            setSchool(newValue.props.value);
                        }}
                    >
                        <MenuItem value="Any">Any</MenuItem>
                        <MenuItem value="Engineering">Engineering</MenuItem>
                        <MenuItem value="Artsci">Artsci</MenuItem>
                        <MenuItem value="Olin">Olin</MenuItem>
                    </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2} >
                    <Autocomplete
                        sx={{ backgroundColor: "white", borderRadius: "5px"}}
                        disablePortal
                        id="course-department"
                        options={departments}
                        renderInput={(params) => <TextField {...params} size="small" label="Department" />}
                        value={department}
                        onChange = {(event, newValue) => {
                            setDepartment(newValue);
                        }}
                    />
                </Grid>
                <Grid item xs={2} >
                    <TextField size="small" sx={{ backgroundColor: "white", borderRadius: "5px"}} id="code" label="Code" value={code} onChange={(event) => {setCode(event.target.value);}}/>
                </Grid>
                <Grid item xs={1.5} >
                    <TextField
                        size="small"
                        sx={{ backgroundColor: "white", borderRadius: "5px"}}
                        id="section"
                        label="Section"
                        type="number"
                        value={section}
                        onChange={(event) => { setSection(event.target.value); }}
                    />
                </Grid>
                <Grid item xs={2}>
                    <FormControl fullWidth>
                    <InputLabel id="semester-select-label">Semester</InputLabel>
                    <Select
                        size="small"
                        sx={{ backgroundColor: "white", borderRadius: "5px"}}
                        labelId="semester-select-label"
                        id="semester-select"
                        value={semester}
                        label="Semester"
                        onChange={(event, newValue) => {
                            setSemester(newValue.props.value);
                        }}
                    >
                        <MenuItem value="Any">Any</MenuItem>
                        <MenuItem value="SP">Spring</MenuItem>
                        <MenuItem value="FL">Fall</MenuItem>
                        <MenuItem value="SU">Summer</MenuItem>
                    </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2} >
                    <DatePicker
                        views={['year']} 
                        label="Year"
                        renderInput={(params) => <TextField sx={{ backgroundColor: "white", borderRadius: "5px"}} size="small" {...params} />}
                        value={year}
                        onChange={(event) => {
                            setYear(event._d);
                        }}
                        disableFuture
                        minDate="2010"
                        maxDate={new Date()}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Button 
                        variant="contained" 
                        endIcon={<SearchIcon /> } 
                        onClick={() => {
                            const course = {
                                name: name,
                                school: school,
                                department: department,
                                code: code,
                                section: (section === 0 ? "Any" : section),
                                year: (year === null ? "Any" : year),
                                semester: semester,
                                professor: professor
                            }
                            handleButtonClick();
                            handleSubmit(course, sortOption, evaluators, setResults);
                        }}>
                        Search
                    </Button> 
                    {loading && (
                        <CircularProgress sx={{ position: 'absolute', top: '40%', left: '50%'}} />
                    )}
                </Grid>
                <Grid item xs={3} >
                    <TextField
                        size="small"
                        sx={{ backgroundColor: "white", borderRadius: "5px", float: "right"}}
                        id="section"
                        label="Minimum Number of Evaluators"
                        type="number"
                        value={evaluators}
                        onChange={(event) => { setEvaluators(event.target.value); }}
                    />
                </Grid>
                <Grid item xs={6} >
                        <RadioGroup
                            sx={{ float: "right"}}
                            value={sortOption}
                            name="radio-buttons-group"
                            row
                            onChange={(event, newValue) => {
                                setSortOption(newValue);
                            }}
                        >
                        <FormControlLabel value="ASCENDING" control={<Radio />} label="Show Easiest Courses First" />
                        <FormControlLabel value="DESCENDING" control={<Radio />} label="Show Hardest Courses First" />
                    </RadioGroup>
                </Grid>
            </Grid> 
        </Box>
        <hr/>
        </>
    );
}

export default Header;