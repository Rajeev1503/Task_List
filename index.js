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




// app.get('/todo/:id/edit', async (req, res) => {
//     const { id } = req.params;
//     const product = await Task.findById(id);
//     res.render("edit", {product})
// })

// app.put('/todo/:id', async (req, res) => {
//     const { id } = req.params;
//     const product = await Task.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
//     res.redirect("/");
// })

// app.delete('/todo/:id', async (req, res) => {
//     const { id } = req.params;
//     const deletedProduct = await Task.findByIdAndDelete(id);
//     res.redirect('/');
// })



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/createtasklist`)
})