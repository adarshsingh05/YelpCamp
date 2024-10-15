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

// another route for the campground
app.get('/makecampground', (req, res) =>{
    // adding the data
    camp = new Campground({
        title: 'My backyard',
        description: 'cheap',
        price: '450'
    })
    res.send(camp);
})