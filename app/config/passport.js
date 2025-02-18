// //complete logic of passport authentication in login page 
// const LocalStrategy = require('passport-local').Strategy;
// const { response } = require('express');
// const User = require('../models/user')
// const bcrypt = require('bcrypt')


// function init(passport){
//     //we created object as usernameField = email, which means we are defining that in our usernamefiled we are taking email
//     // we also created a function having what we are getting from user i.e, email and password and done is a callback function used when task is completed
//     passport.use(new LocalStrategy({ usernameField : 'email'}, async (email, password, done)=>{
        
//         //login logic
//         //check if email exist in database
//         const user = await User.findOne({email: email})
//         if(!User){
//             return done(null, false, {message: 'no user with this email'})
//         }

//         //if user exist in our database
//         //making sure the input password and previously entered password are same
//         bcrypt.compare(password, user.password).then(match => {
//             if(match) {
//                 return done(null, user,{message: 'login sucessful'})   //password matched
//             }
//             return done(null, false , {message: 'wrong username or password'})   //password did not matched
//         }).catch(err =>{
//             return done(null, false, {message: 'something went wrong'})
//         })


//     }))

// //when user gets logged in we need to store something in session. so we store id
//     passport.serializeUser( (user, done) => {
//         done(null, user._id)  //we can store any thing
//     }) 

//     //in above passport.serializeUser we are storing result in session and now in passport.deserializeUser we are getting that stored id
//     passport.deserializeUser((id, done) => {
//         User.findById(id, (err, user)=>{
//             done(err,user)
//         })
//     })

// }


// module.exports = init









const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');

function init(passport) {
    // Define the local strategy
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            // Check if the email exists in the database
            const user = await User.findOne({ email: email });
            if (!user) {
                return done(null, false, { message: 'No user with this email' });
            }

            // Compare the provided password with the hashed password in the database
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                return done(null, user, { message: 'Login successful' });
            } else {
                return done(null, false, { message: 'Wrong username or password' });
            }
        } catch (err) {
            return done(null, false, { message: 'Something went wrong' });
        }
    }));
 
    // Serialize user (store user ID in session)
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    // Deserialize user (fetch user from session using stored ID)
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);  // Use async/await instead of a callback
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
}

module.exports = init;
