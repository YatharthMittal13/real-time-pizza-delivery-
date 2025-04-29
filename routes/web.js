const authController = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/customers/cartController');
const homeController = require('../app/http/controllers/homeController');
const orderController = require('../app/http/controllers/customers/orderController');
const adminOrderController = require('../app/http/controllers/admin/orderController');
const statusController = require('../app/http/controllers/admin/statusController');


//middleware
const guest = require('../app/http/middleware/guest')
const auth = require('../app/http/middleware/auth')

//middleware for admin
const admin = require('../app/http/middleware/admin');

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

//customer related routes
app.post('/orders',auth, orderController().store)

app.get('/customer/orders',auth , orderController().index )
//route for sinle order status to customer
//here id is dynamic therefore : used
app.get('/customer/orders/:id',auth , orderController().show)

//Admin routes 
app.get('/admin/orders', admin , adminOrderController().index )

//route for order status
app.post('/admin/order/status' , admin, statusController().update)

}
  
module.exports = initRoutes