const authController = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/customers/cartController');
const homeController = require('../app/http/controllers/homeController');

function initRoutes(app){       //we are getting app from server.js file which is express

//for home page
app.get('/', homeController().index);                          //template engine is providing locationof home.ejs
    
//for cart page
app.get('/cart', cartController().index)

app.post('/update-cart', cartController().update)

//for login page
app.get('/login', authController().login)

//for register page
app.get('/register', authController().register)
}

module.exports = initRoutes