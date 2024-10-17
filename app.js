const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const Campground = require('./model/campground');
const methodOverride=require('method-override');
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
// adding urlextended
app.use(express.urlencoded({extended:true}));
app.set('views' ,path.join(__dirname, 'views'))

// passing name to method override
app.use(methodOverride('_method'));


// defining the route to handle the request to the root path
app.listen(3000, ()=>{
    console.log("this is the port in terminal ")
})

// sending the data

app.get('/', (req, res) =>{
    res.render('home')
})

app.get('/campgrounds', async  (req,res) =>{
    // getting all the campground in a variable from the file of campground.js imported above
    const campgrounds = await Campground.find({})
    // rendering the file of html here for the ui
    res.render('campground/index',{campgrounds})

})

// adding the route to add new campgrounds
app.get('/campgrounds/new', (req,res)=>{
    res.render('campground/new');
})
// adding a post request route for the newly added campgrounds
app.post('/campgrounds', async(req,res) =>{
    // res.send(req.body);
    // actually saving the data in the DB
    const campground = new Campground(req.body.campground);
    await  campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
})
// get the clicked campground details
app.get('/campgrounds/:id', async (req, res) =>{
    const campground = await Campground.findById(req.params.id);
        res.render('campground/show',{campground})
    })
// new route to edit the campground.. the data we are editing in DB comes from Campground
app.get('/campgrounds/:id/edit', async (req,res)=>{
     const campground = await Campground.findById(req.params.id);
     res.render('campground/edit',{campground})
})

// updating the edit form
app.put('/campgrounds/:id', async(req,res)=>{
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id,{...req.body.campground})
    res.redirect(`/campgrounds/${campground._id}`)
})




