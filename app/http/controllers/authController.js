//contains route logic for login and registration
const User = require('../../models/user')
const bcrypt = require('bcrypt')   //library used to hash password                                                                    
const passport = require('passport')

function authController(){

    //function to check if user role is admin then redirect it to admin/orders
    //if user is customer then redirect to customer/orders
    const _getRedirectUrl = (req) =>{
        return req.user.role == 'admin' ? '/admin/orders' : '/customer/orders'
    }
 
    return{
        login (req, resp) {
            resp.render('auth/login')

        },
        postLogin(req, resp, next){
            passport.authenticate('local' , (err, user, info)=>{   //info contain part of message from(passport.js file)
                 if(err) {
                    req.flash('error', info.message)
                    return next;
                 }

                 if(!user){
                    req.flash('error', info.message)
                    return resp.redirect('/login')
                 }

                 req.logIn(user, (err)=>{
                    if(err) {
                        req.flash('error', info.message)
                        return next(err)
                    }
                    //if user is customer then redirect to customer/orders
                    //if user is admin then redirect to admin/orders
                    return resp.redirect(_getRedirectUrl(req))
                 })
            })(req, resp, next)
        },

        register(req , resp){         
            resp.render('auth/register')
        },
        async postRegister(req, resp){     //function enabled when we get data from user in register page and have top save it in a database
            const{name, email, password } = req.body //function to store data of register field in database
            
            //check either request is valid or not
            if(!name || !email || !password){      //if any of these field is empty or noty valid we wil redirect user to register page
                req.flash('error', '*All feilds are Required')
                
                //so whenever we get error, we refresh the page so the existing field data also disapear
                //to overcome this we will again send the previous data
                req.flash('name', name)
                req.flash('email',email)  //here previous data is again send but to isplay it to frontend we go to register.ejs 
                                          //we add extra field in input (value).
                return resp.redirect('/register')
            }

            //check if email is new or existing(unique for our database) one email one user
            //orignal code- not working 


            // User.exists({email: email}, (err, result) =>{   
            //     if(result){                 
            //         req.flash('error', '*Email already registered')
            //         req.flash('name', name)
            //         req.flash('email',email)
            //         return resp.redirect('/register')
            //     }
            // })



//check if email is new or existing(unique for our database) one email one user
//updated code - working

            User.exists({ email: email })
    .then(result => {
        if (result) {
            req.flash('error', '*Email already registered');
            req.flash('name', name);
            req.flash('email', email);
            return resp.redirect('/register');
        } else {
            // Handle the case where email is not registered
        }
    })
    .catch(err => {
        // Handle the error
        console.error(err);
    });

            //we do not directly save the password in datbase we first hash the password
            //creating hash pasword
            
            const hashedPassword = await bcrypt.hash(password, 10) 

            //create user
            const user = new User({
                name: name,
                email: email,
                password: hashedPassword
            })

            user.save().then((user) =>{
                // redirecting it to home page or login page
                return resp.redirect('/')
            }).catch(err =>{
                //if any error comes again redirect it to register page
                req.flash('error', 'something went wrong')
                return resp.redirect('/register');
            })

            
            console.log(req.body)
        },

        // logout(req, resp){  //orignal-not able to return callback function
        //     req.logout()
        //     return resp.redirect('/login')
        // }



        logout(req, resp){
            req.logout(function(err){
                if(err) {
                    return next(err);
                }
                return resp.redirect('/login');
            });
        }


    }
}

module.exports = authController