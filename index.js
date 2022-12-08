require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const path = require('path');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

// required routes
const createTaskList = require('./Routes/createTaskList');
const createTask = require('./Routes/createTask');
const auth = require('./Routes/auth');
const account = require('./Routes/account');

const app = express()
const port = process.env.PORT || 8000
const DB = process.env.DATABASE;
  

app.use(bodyParser.json());
app.use(cookieParser());
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

app.use(auth);
app.use(account);
app.use(createTaskList);
app.use(createTask);

app.get('/', (req,res)=> {
  res.redirect('/api/createtasklist');
})


app.listen(port);