const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema =  new Schema({
    name: {type: String, required: true },
    email: {type: String, required: true, unique: true },
    password: {type: String, required: true },
    role: {type: String, default: 'customer'}     // we have 2 roles 1. customer 2, admin   bydefault every user is customer //note- we will create admin manually
}, {timestamps: true})    //timestamp is used so that we get the time of when user is registered                        

//note- name of model in schema is always singular bydefault in database it will be created as menus(prural)



module.exports =  mongoose.model('User', userSchema)    