const express = require('express');
const app = express();

const ejs = require('ejs');
const expresslayout = require('express-ejs-layouts');

const path = require('path');


app.get('/', (req , resp)=>{
    resp.render('home')
});


//set template engine
app.use(expresslayout);
app.set('views' , path.join(__dirname , '/resources/views'));
app.set('view engine', 'ejs');


const PORT = process.env.PORT || 3300
app.listen(PORT , ()=>{
    console.log(`listening on port ${PORT}`)
});
 