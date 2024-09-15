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

require('./routes/web')(app)



const PORT = process.env.PORT || 3300
app.listen(PORT , ()=>{
    console.log(`listening on port ${PORT}`)
});
 