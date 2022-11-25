// Setup empty JS object to act as endpoint for all routes
projectData = {};


const port = 3000;

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

//routes function
const getAllData = (req, res) => {
    res.send(projectData);
}

const postWeather = (req, res) => {
    //create a new object with incoming data
    let newData = {
        //city name
        temp: req.body.temp,
        date: req.body.date,
        userResponse: req.body.userResponse,
        name: req.body.name,
    }


    //pass data to the projectData
    projectData = newData;
}

//routes

//get all data
app.get('/all', getAllData)

//post into projectData
app.post('/postWeather', postWeather);




// Setup Server
app.listen(port, () => {
    console.log(`Starting server at http://localhost:${port}`);
})