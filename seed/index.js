// setting the connection to mongoose
const mongoose = require('mongoose');
const Campground = require('../model/campground');
const cities = require('./cities');
const {descriptors, places} = require('./seedHelpers');

// connecting the exported mongoose
mongoose.connect('mongodb://localhost:27017/yelp-camp');
// checking if any error in DB or not
const db= mongoose.connection;
db.on("error ", console.error.bind(console, "db connection error"));
db.once("open", ()=>{
    console.log("db is connected");
})

// one liner function to genereate a random number inside the lenght of an array

const sample = (array)=> array[Math.floor(Math.random() *array.length)];



// function to delete and add a dummy data

const seedDB = async () =>{
    await Campground.deleteMany({});
    for(let i=0;i<50;i++){
        const random1000= Math.floor(Math.random() *1000);
        const camp = new Campground({
            location: `${cities[random1000].city} , ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // link to random images using api
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description: 'The text-muted class in Bootstrap is designed to make the text lighter by reducing its opacity. If its not working, try adding more specific text color classes to ensure its properly applied',
            price: 20,
        })
        await camp.save()
    }
    
}
seedDB().then(()=>{
    mongoose.connection.close();
})