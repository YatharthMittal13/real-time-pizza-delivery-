// const Order = require('../../../models/order')

// function statusController(){
//     return{
//         update(req , resp){
//            // logic to update status of orders singularly
//           // if database _id is equal to orderId
//            Order.updateOne({_id: req.body.orderId} ,{status: req.body.status}, (err, data)=>{
//             if (err) {
//                 return resp.redirect('/admin/orders');
//             }

//             return resp.redirect('/admin/orders')
//            } )
//         }
//     }
// }


// module.exports = statusController

const Order = require('../../../models/order');

function statusController() {
    return {
        async update(req, resp) {
            try {
                await Order.updateOne(
                    { _id: req.body.orderId }, 
                    { status: req.body.status }
                );
                return resp.redirect('/admin/orders');
            } catch (err) {
                console.error("Error updating order status:", err);
                return resp.redirect('/admin/orders');
            }
        }
    };
}

module.exports = statusController;


