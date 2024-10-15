const express = require('express');
const path = require('path');
const app = express();

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