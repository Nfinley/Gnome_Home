/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Passwords = require('machinepack-passwords')
var passport = require('passport')

module.exports = {
    loginUser: function(request, response) {
        let email = request.body.email;
        let password = request.body.password;
        // console.log(email)
        // console.log(password)

        // Retrieve results so that unique user can be verified, and password may be checked against stored, encrypted password
        GnomeUsersAPI.find().where({'email':email})
        .exec(function(error, result) {
            if(error) {
                console.log('error: ' + error)
            } else {
                // Make sure length == 1.  If not, dupe user
                if(result.length > 1) {
                    return response.send('Dupe user error!')
                }
                // Get user information from result. Will be used later for session info
                const encryptedPassword = result[0].password;
                const userId = result[0].id;
                const email = result[0].email;
                const firstName = result[0].firstname;
                const lastName = result[0].lastname;
                console.log('encryptedPass: ' + encryptedPassword + ' password: ' + password + ' userId: ' + userId + ' email: ' + email + ' firstName: ' + firstName + ' lastName: ' + lastName)
                // Verify password input against encrypted password
                Passwords.checkPassword({
                    passwordAttempt: password,
                    encryptedPassword: encryptedPassword,
                }).exec({
                    // An unexpected error occurred.
                    error: function (err){
                        console.log('Pass verification failed')
                        response.redirect('/Session')
                    },
                    // Password attempt does not match already-encrypted version
                    incorrect: function (){
                        console.log('User-entered password does not match the stored password.')
                        response.redirect('/Session')
                    },
                    // User verified. Add current user information to session here, for later use
                    // Note: There is currently no time expiration on the session. If you would like to set an expiration, do like the following, but edit the time allotted:
                    // var oldDateObj = new Date()
                    // var newDateObj = new Date(oldDateObj.getTime() * 600000)
                    // req.session.cookie.expires = newDateObj;
                    success: function (){
                        console.log('User was verified!')
                        request.session.authenticated = true;
                        request.session.userId = userId;
                        request.session.email = email;
                        request.session.firstName = firstName;
                        request.session.lastName = lastName;

                        console.log('session info: ' , request.session)
                        // Send the user to their dashboard since they were authenticated
                        response.redirect('/Dashboard')
                    },
                })
            }
        })
    },

    facebook: function(request, response) {
        passport.authenticate('facebook', {
            failureRedirect: '/index', scope:['email'] }, function(err, user) {
                request.logIn(user, function(err) {
                    if(err) {
                        console.log(err)
                        response.view('500')
                        return;
                    }
                    response.redirect('/Dashboard')
                    return;
                })
            }
        })
    }
};

