// const order = require("../../../models/order")
// const Order = require("../../../models/order")

// function orderController(){
//     return{
//         index(req,resp){  // $ne : completed is used so that list that orders which are not completed
//             order.find({status : {$ne : 'completed' }} , null , {sort : {'createdAt':-1 }} ).
//             populate('customerId', '-password').exec((err,orders)=>{  // populate is used because we do not want customerId we want all details inside customerId
                
//                 if(req.xhr){
//                     return resp.json(orders)
//                 }else{
//                 resp.render('admin/orders')  //-password is used because we do not want user password as admin
//                 }
//             } )   
//         }
//     }
// }

// module.exports = orderController

const Order = require("../../../models/order"); // Use the correct variable name

function orderController() {
    return {
        async index(req, resp) {  
            try {
                // Fetch orders that are not completed
                const orders = await Order.find({ status: { $ne: 'completed' } })
                    .sort({ createdAt: -1 })
                    .populate('customerId', '-password'); // Exclude password

                // Check if the request is an AJAX request (XHR)
                if (req.xhr) {
                    return resp.json(orders);
                } else {
                    resp.render('admin/orders');
                }
            } catch (err) {
                console.error("Error fetching orders:", err);
                resp.status(500).send("Internal Server Error");
            }
        }
    };
}

module.exports = orderController;
