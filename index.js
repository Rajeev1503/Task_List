const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const path = require('path');
const bodyParser = require("body-parser");


// required routes
const createTaskList = require('./Routes/createTaskList');
const createTask = require('./Routes/createTask');

const app = express()
const port = process.env.PORT || 8000
const DB =
  "mongodb+srv://rajeev:1409rajeev@cluster0.ronsn.mongodb.net/tasklist?retryWrites=true&w=majority";

app.use(bodyParser.json());
app.set('view engine', 'ejs')
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));


mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("MONGO CONNECTION ERROR!!!!")
        console.log(err)
})

app.use(createTaskList);

// app.get('/', (req,res)=> {
//   res.redirect('/createtasklist');
// })


app.listen(port);