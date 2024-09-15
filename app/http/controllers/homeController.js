function homeController(){
    return{
        index (req, resp) {
            resp.render('home')

        }
    }
}

module.exports = homeController