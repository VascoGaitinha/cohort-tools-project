const express = require("express");
const morgan = require("morgan");
const cors = require('cors')
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');

const dbUrl="mongodb://127.0.0.1:27017/cohort-tools-api"
const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const cohortsList = require( './cohorts.json');
const studentsList = require('./students.json');
const Cohort = require('./models/Cohort')
const Student =  require('./models/Student')


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

app.get('/api/cohorts', (req, res) => {
  Cohort.find()
    .then((cohorts) => {
      console.log('Cohorts:', cohorts);
      res.status(200).json(cohorts);
    })
    .catch((err) => {
      console.log('Error fetching cohorts:', err);
      res.status(500).send('Internal Server Error');
    });
});


app.get('/api/students',(req,res)=>{
  Student.find()
  .then((students)=>{
    console.log('Student List:',students)
    res.status(200).json(students)
  })
  .catch((err)=>{
    console.log('Error fetching student data', err)
    res.status(500).send('Internal Server Error')
  })
})

app.post('/api/students', (req,res) => {
  Student.create(req.body)
  .then((student)=>{
    console.log("Student Created Sucessfully")
    res.status(200).json(student)
  })
  .catch((err)=>{
    console.error('Could not create because',err)
    res.status(500).json({error: err.message})
  })
})

app.get('/api/students/cohort/:cohortId', (req,res)=>{
  Student.find({ cohort: `ObjectId(`${req.params.cohortId}`)` })
  .then((students)=>{
    console.log('Retrieved sucessfully', students)
    res.status(200).json(students)
  })
  .catch((err)=>{
    console.log(`Error fetching students by cohort ${err}`)
    res.status(500).json({error: err.message})
  })
})


//Mongoose-Connection

mongoose
        .connect(dbUrl)
        .then( e => console.log(`Connection ON! ${e.connections[0].name}`))
        .catch(err =>{
        console.log(`Can't connect because ${err}`)
        res.status(500).send("Internal Server Error!")
      })

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});