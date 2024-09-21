const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const orderSchema =  new Schema({
    customerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: true },  //we did not give string bcos we do not want to store user id as string instead we want to store it as a referance connection with user
    items: {type: Object , required: true },
    phone: {type: String, required: true },
    address: {type: String, required:true},
    paymentType: {type: String, default:'COD'},    //cod =cash on delivery
    status: {type: String, default:'order_placed'},
}, {timestamps: true})                            





module.exports =  mongoose.model('Order', orderSchema)    