//this file is used when let suppose that user is already logged then he should not be able to to go to login page
//but after manually entering /login in localhost address user can go to login page 
//to avoid that we have this file

function guest (req, resp, next ){
    if(!req.isAuthenticated() ){    // means user is not logged in therefore process the request 
        return next()
    }
    return resp.redirect('/')  //if user is logged in means then we are again redirecting him to home page
}

module.exports = guest