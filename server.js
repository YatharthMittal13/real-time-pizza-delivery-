require('dotenv').config();
const express = require('express');
const app = express();

const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');  //this package is used to avoid multiple repeatation of same thing(nav) in different pages 

const path = require('path');

const mongoose = require('mongoose');

const session = require('express-session');// session is used to generate token everytime a new user enters

const flash = require('express-flash')  //library used to flash message only once and gets dissapeard when refreshed a page// used in register(authcontroller.js file)

const MongoDbStore = require('connect-mongo')(session)   // package to store our cookies

const passport = require('passport')  //Passport is authentication middleware for Node.js.  using passport we can make user login from anywhere like google,facebook etc. but here we are using local

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


//passport config
const passportInit = require('./app/config/passport')    //complete logic of passport authentication is in this file 
passportInit(passport)

app.use(passport.initialize())
app.use(passport.session())


//using express-flash as middleware
app.use(flash());

//by defauld express cannot recieve data in JSON format
//to enable that function
//this json data is of cart fields (menus.json file)
app.use(express.json());

//in register.ejs and authcontroller contains data in urlencoded form and by dedfault it is disabled in express
//to enable this we have 
app.use(express.urlencoded({extended : false})) 

//assestss
app.use(express.static('public'));

//global middleware  // it is used in layout.ejs file to provide acess of session n that file 
app.use((req,resp,next) =>{
    resp.locals.session = req.session 
    resp.locals.user = req.user  
    next()
})

//set template engine
app.use(expressLayout);
app.set('views' , path.join(__dirname , '/resources/views/'));
app.set('view engine', 'ejs');

require('./routes/web')(app)



const PORT = process.env.PORT || 3300
app.listen(PORT , ()=>{
    console.log(`listening on port ${PORT}`)
});
 