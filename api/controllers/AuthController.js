/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
// var passport = require('passport')

module.exports = {
    /*
    login: function(request, response) {
        passport.authenticate('local', function(err, user, info) {
            if(err || !user) {
                return response.send({
                    message: info.message,
                    user: user
                })
            }
            request.login(user, function(err) {
                if(err) response.send(err)
                return response.send({
                    message: info.message,
                    user: user
                })
            })
        })(request, response)
    },*/

    logout: function(request, response) {
        request.session.authenticated =
        response.redirect('/index')
    }
};

