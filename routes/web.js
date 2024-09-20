const authController = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/customers/cartController');
const homeController = require('../app/http/controllers/homeController');
const guest = require('../app/http/middleware/guest')

function initRoutes(app){       //we are getting app from server.js file which is express

//for home page
app.get('/', homeController().index);                          //template engine is providing locationof home.ejs
    
//for cart page
app.get('/cart', cartController().index)

app.post('/update-cart', cartController().update)

//for login page
app.get('/login', guest, authController().login)

//login related to post(passport.js) used when user input the details
app.post('/login' ,authController().postLogin)

//for register page
app.get('/register',guest, authController().register)

app.post('/register', authController().postRegister)

app.post('/logout', authController().logout)
}

module.exports = initRoutes