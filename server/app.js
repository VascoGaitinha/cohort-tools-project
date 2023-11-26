const express = require("express");
const morgan = require("morgan");
const cors = require('cors')
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');


const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const cohortsList = require( './cohorts.json');
const studentsList = require('./students.json');
const cohorts = require('./models/Cohorts')


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html"); 
});

app.get('/api/cohorts',(req,res)=>{
  res.json(cohorts)
})

app.get('/api/students',(req,res)=>{
  res.json(studentsList)
})


//Mongoose-Connection

mongoose.connect('mongodb://localhost:5005/cohorts-tools-api', ()=> {
  console.log("Connection Ok")
})

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});