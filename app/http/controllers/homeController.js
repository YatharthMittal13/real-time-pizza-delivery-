const Menu = require('../../models/menu')

function homeController(){
    return{
        async index (req, resp) {

            const pizzas = await Menu.find()
            console.log(pizzas)
            return resp.render('home', {pizzas: pizzas})




        //     Menu.find().then(function(pizzas){
        //         console.log(pizzas)
        //     return resp.render('home', {pizzas: pizzas} )
        // })
        }
    }
}

module.exports = homeController