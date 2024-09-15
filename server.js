const express = require('express');
const app = express();

const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');  //this package is used to avoid multiple repeatation of same thing(nav) in different pages 

const path = require('path');

//assestss
app.use(express.static('public'));


//set template engine
app.use(expressLayout);
app.set('views' , path.join(__dirname , '/resources/views/'));
app.set('view engine', 'ejs');



app.get('/', (req , resp)=>{ //for home page
    resp.render('home')     //go to views folder and then home.ejs
});                          //template engine is providing locationof home.ejs


//for cart page
app.get('/cart', (req,resp)=>{
    resp.render('customers/cart')
})

//for login page
app.get('/login', (req,resp)=>{
    resp.render('auth/login')
})


//for register page
app.get('/register', (req,resp)=>{
    resp.render('auth/register')
})



const PORT = process.env.PORT || 3300
app.listen(PORT , ()=>{
    console.log(`listening on port ${PORT}`)
});
 