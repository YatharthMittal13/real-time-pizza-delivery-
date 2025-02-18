// this middleware is used when we want only admin to access the specifc pages

function admin (req, resp, next){
    //if user is logged in and user is admin
    if(req.isAuthenticated() && req.user.role == 'admin' ){
       //then process next
        return next()
    }
    //otherwise return to homepage
    return resp.redirect('/')
}

module.exports = admin