//if user is not logged it and try to access page which require login then he will be re-directed to login page

function auth(req,resp, next){
    if(req.isAuthenticated()){    //if user is logged in then process the request
        return next()
    }
    return resp.redirect('/login');
}

module.exports = auth;