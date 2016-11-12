'use_strict';

const passport = require('passport')
LocalStrategy = require('passport-local').Strategy,
Passwords = require('machinepack-passwords');

passport.serializeUser(function(user, done) {
    done(null, user.id)
})

passport.deserializeUser(function(id, done) {
    GnomeUsersApi.findOne({ id: id }, function(err, user) {
        done(err, user)
    })
})


// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
// }, function(email, password, done) {
//     GnomeUsersApi.findOne({ email:email }, function(err, user) {
//         if(err) return done(err)
//         if(!user) {
//             return done(null, false, { message: 'Incorrect email.' })
//         }
//     })
// }
// )

