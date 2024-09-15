function cartController(){
    return{
        index (req, resp) {
            resp.render('customers/cart')

        }
    }
}

module.exports = cartController