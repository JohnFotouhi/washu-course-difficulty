const express = require("express");
const db = require('./db');
const path = require('path');
var qs = require('querystring');

const PORT = process.env.PORT || 3456

const app = express();

// For testing purposes
app.get("/test", (req, res) => {
    res.json({ message: "Hello from server!" });
});

// This API gets all the different names, departments, and professors from the database to be used in autocomplete fields
app.get("/getUniqueCourseInfo", async(req, res) => {
  var names = await db.queryUnique("name");
  var departments = await db.queryUnique("department");
  var professors = await db.queryUnique("professor");
  res.json({ names: names, departments: departments, professors: professors });
});

// Get 10 random courses
app.get("/getRandom", async(req, res) => {
  var courses = await db.queryRandom();
  res.json({ courses: courses });
});

// Query courses using a given set of filters
app.post("/queryCourses", async(req, res) => {
  var body = '';
  req.on('data', (data) => {
    body += data;
    if (body.length > 1e6)
      request.connection.destroy();
  });
  req.on('end', async() => {
    var post = JSON.parse(body);
    var courses = await db.query(post.courseData, post.sortOption, post.evaluators);
    res.json(courses);
  })
})

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// Listen for calls to the API
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
