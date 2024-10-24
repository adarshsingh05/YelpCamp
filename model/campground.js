const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating the campground schema for DB
const CampgroundSchema = new Schema({
    title: String,
    image: String,
    price :Number,
    description : String,
    location: String
})

// exporting the module

module.exports = mongoose.model('Campground', CampgroundSchema);