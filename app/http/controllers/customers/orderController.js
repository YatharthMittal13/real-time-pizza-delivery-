//complete logic for order route 
//it will take address and phone number from user and update order to admin

const Order = require('../../../models/order')
const moment = require('moment');

function orderController() {
    return{
        store(req, resp){
            console.log(req.body) // initially it was returning empty object i.e( {} ) to get the console we added "name" in phone and address field of cart.ejs file

            const{phone , address} = req.body //taking phone number and address
            if(!phone || !address){
                console.log('error enter data first')
                req.flash('error', 'All fields required')  //if either fieldm is empty display error
                //return resp.redirect('/cart')
                return resp.json({message : 'all fields required'});
            }

            const order = new Order({ //using previously defined  schema from order.js file under models folder
                customerId: req.user._id,  // we are taking id of user instead new customer new _id
                items: req.session.cart.items,  
                phone, 
                address
            })

            console.log("Cart Items:", req.session.cart);
            order.save().then(result =>{  //callback function returning everything 
                req.flash('success', 'Order placed sucessfully')
                console.log('data entered sucessfully')

                delete req.session.cart;  

                return resp.redirect('/customer/orders')  //redirecting user to myorder page
            }).catch(err =>{
                req.flash('error', 'something went wrong')
                return resp.redirect('/cart')
            })
    
        },

        //all order page logic
        async index(req, resp){
            const orders = await Order.find({ customerId: req.user._id },null, {sort: {'createdAt': -1}})  // sort is used so that latest order comes at top in all order page
            resp.render('customers/orders', {orders: orders , moment: moment } )  //moment is used to format time we displayed in all order i.e orders.ejs
            console.log(orders)
        }
    }
}

module.exports = orderController


