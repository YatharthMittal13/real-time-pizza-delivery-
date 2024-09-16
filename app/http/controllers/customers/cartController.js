const { json } = require("express")

function cartController(){
    return{
        index (req, resp) {
            resp.render('customers/cart')
        },


        update(req, resp){
            //create empty cart
            if(!req.session.cart){   //if cart is empty then we will create a cart having following objects
                req.session.cart = {
                    item: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }
                let cart = req.session.cart      //if cart is not empty we will recieve data of cart over here
                console.log(req.body);
                //check if item does not exist in cart then update the cart
                if (!cart.item[req.body._id]) {      //this id comes from app.js(resource folder) under addToCart function
                    cart.item[req.body._id] ={
                        item: req.body,
                        qty: 1
                    }
                    cart.totalQty = cart.totalQty + 1
                    cart.totalPrice = cart.totalPrice + req.body.price
                }    ////check if item already exist if exist then increase quantity
                else{
                    cart.item[req.body._id].qty = cart.item[req.body._id].qty + 1
                    cart.totalQty = cart.totalQty + 1
                    cart.totalPrice = cart.totalPrice + req.body.price;
                }

            return resp.json({totalQty : req.session.cart.totalQty })
        
        // update(req,resp){
        //     return resp.json({data: 'all okay'})
        // }
        
        }
    }
}

module.exports = cartController








