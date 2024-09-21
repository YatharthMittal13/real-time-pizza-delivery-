//complete logic for order route 
//it will take address and phone number from user and update order to admin

const Order = require('../../../models/order')

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
            order.save().then(result =>{  //callback function returning everything 
                req.flash('success', 'Order placed sucessfully')
                console.log('data entered sucessfully')
                return resp.redirect('/')  //redirecting user to myorder page
            }).catch(err =>{
                req.flash('error', 'something went wrong')
                return resp.redirect('/cart')
            })
    
        }
    }
}

module.exports = orderController


