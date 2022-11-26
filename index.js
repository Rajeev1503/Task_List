const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const path = require('path');

const app = express()
const port = process.env.PORT || 8000
const DB =
  "mongodb+srv://rajeev:1409rajeev@cluster0.ronsn.mongodb.net/tasklist?retryWrites=true&w=majority";

app.set('view engine', 'ejs')
    app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));


const Item = require('./model/item')

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("MONGO CONNECTION ERROR!!!!")
        console.log(err)
})

app.get('/', (req, res) => {
  res.redirect('/todo')
})

app.get('/todo', async(req, res) => {
    const products =  await Item.find({})
    res.render('index', {products})
})


app.post('/todo', async(req, res) => {
    const data = new Item(req.body)
    await data.save()
    .then(() => {
        console.log("Data Save successsFull")
    })
    .catch(() => {
        console.log("Data Not Save  ")
    })
    console.log("Hello And Welcome " + req.body.list)
    res.redirect('/')
})

app.get('/todo/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Item.findById(id);
    res.render("edit", {product})
})

app.put('/todo/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Item.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect("/");
})

app.delete('/todo/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Item.findByIdAndDelete(id);
    res.redirect('/');
})

app.get('/api/createtasklist', async (req, res) => {
    const products =  await Item.find({})
    res.render('createtasklist', {products})
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})