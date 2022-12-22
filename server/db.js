const mysql = require('mysql');

var config = {
    host: "18.118.18.250",
    user: "server",
    password: "Follow Basin-Watch-Shelf-4",
    database: "difficulty",
}

// Queries courses from database with filters
async function query(courseData, sortOption, evaluators){
    const result = await new Promise((resolve, reject) => {
        // Connect to the database
        var con = mysql.createConnection(config);
        con.connect();
        let query = "SELECT * FROM evaluations WHERE";
        // Add all the selection parameters to the query string
        for(let attribute in courseData){
            if(courseData[attribute] !== "Any" && courseData[attribute] !== null){
            query = query + " " + attribute + "=" + con.escape(courseData[attribute]) + " AND";
            }
        }
        // Add the review_count filter
        query = query + " review_count>" + con.escape(evaluators);
        // Sort the results by ascending or descending
        let sort = (sortOption == "ASCENDING" ? "ASC" : "DESC");
        query = query + " ORDER BY difficulty " + sort;
        console.log(query);
        // Execute and return the query
        con.query(query, function (err, result) {
            con.destroy();
            if (err) console.log(err);
            resolve(result);
        });
    });
    return result;
}

// TODO: Order alphabetically
// Get all unique values from a specific column
async function queryUnique(column){
    const result = await new Promise((resolve, reject) => {
        var con = mysql.createConnection(config);
        con.connect();
        var sql = "SELECT DISTINCT " + column + " FROM evaluations";
        con.query(sql, function (err, result) {
            con.destroy();
            if (err) console.log(err);
            resolve(result);
        });
    });
    return result;
}

// Select 10 random rows from the table
async function queryRandom(){
    const result = await new Promise((resolve, reject) => {
        var con = mysql.createConnection(config);
        con.connect();
        var sql = "SELECT * FROM evaluations ORDER BY RAND() LIMIT 10";
        con.query(sql, function(err, result){
            con.destroy();
            if(err) console.log(err);
            resolve(result);
        });
    });
    return result;
}

module.exports = {
    queryUnique,
    query,
    queryRandom
}