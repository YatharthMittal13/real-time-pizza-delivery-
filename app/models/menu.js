const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const menuSchema =  new Schema({
    name: {type: String, required: true },
    image: {type: String, required: true },
    price: {type: Number, required: true },
    size: {type: String, required: true },
})

//note- name of model in schema is always singular bydefault in database it will be created as menus(prural)



module.exports =  mongoose.model('Menu', menuSchema)    