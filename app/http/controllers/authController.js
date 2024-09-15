//contains route logic for login and registration

function authController(){
    return{
        login (req, resp) {
            resp.render('auth/login')

        },

        register(req , resp){
            resp.render('auth/register')
        }
    }
}

module.exports = authController