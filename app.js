const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const Campground = require('./model/campground');
// connecting the exported mongoose
mongoose.connect('mongodb://localhost:27017/yelp-camp',
    
);
// checking if any error in DB or not
const db= mongoose.connection;
db.on("error ", console.error.bind(console, "db connection error"));
db.once("open", ()=>{
    console.log("db is connected");
})

// setting the view engine to load the ejs file 
app.set('view engine' , 'ejs');
app.set('views' ,path.join(__dirname, 'views'))


// defining the route to handle the request to the root path
app.listen(3000, ()=>{
    console.log("this is the port in terminal ")
})

// sending the data

app.get('/', (req, res) =>{
    res.render('home')
})

app.get('/campgrounds/:id', async (req, res) =>{
const campground = await Campground.findById(req.params.id);
    res.render('campground/show',{campground})
})

// adding the all name campground route

app.get('/campgrounds', async  (req,res) =>{
    // getting all the campground in a variable from the file of campground.js imported above
    const campgrounds = await Campground.find({})
    // rendering the file of html here for the ui
    res.render('campground/index',{campgrounds})

})