require('dotenv').config();
const express = require('express');
const app = express();

const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');  //this package is used to avoid multiple repeatation of same thing(nav) in different pages 

const path = require('path');

const mongoose = require('mongoose');

const session = require('express-session');

const flash = require('express-flash')

const MongoDbStore = require('connect-mongo')(session)   // package to store our cookies
//database connection
const url = 'mongodb://localhost:27017/pizza';

//orignal connection by coders gyan

//  mongoose.connect(url, {useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify: false});
//  const connection = mongoose.connection;
//  connection.once('open' , () => {
//     console.log('Database connected...');
//  }).catch(err => {
//     console.log('connection failed...')
//  });



mongoose.connect(url, { 
    useNewUrlParser: true,  
    useUnifiedTopology: true, 
  // change useFindAndModify to false as it's deprecated
}).then(() => {
    console.log('Database connected...');
}).catch((err) => {
    console.log('Connection failed...', err);
});

//session store in mongo (mongoDbStore)
const connection = mongoose.connection;

let mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    collection: 'sessions'
})



//session config
app.use(session({                //for every client/user server generate new sessionId/ key which is unique for everytime
    secret: process.env.COOKIE_SECRET,
    store: mongoStore,
    resave: false,        //location to store this unique id/key i.e here in this case- database
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hour
}))


//using express-flash as middleware
app.use(flash());


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
 