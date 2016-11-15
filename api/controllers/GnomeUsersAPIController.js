/**
 * GnomeUsersAPIController
 *
 * @description :: Server-side logic for managing Gnomeusersapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var Passwords = require('machinepack-passwords'); //Password encryption

module.exports = {

    // User authentication function
    authenticated: function(request, response) {
        console.log('reached authenticate fn')
        if(request.session.authenticated) {
            console.log('User ' + request.session.userId + ' is authenticated! Email address is: ' + request.session.email);
            return true;
        } else {
            console.log('User is not authenticated!')
            return false;
        }
    },

    //Add a user to the database, and encrypt submitted password
    addUser: function (request, response) {
        //TODO use helper function (in services folder) to validate criteria
        Passwords.encryptPassword({password: request.body.password}).exec({
            error: function (err) {

              //TODO error handling
              console.log(err);
              return response.serverError(err);
            },
            success: function (encryptedPassword) {
              console.log({
                email: request.body.email, password: encryptedPassword,
                firstname: request.body.firstname,
                lastname: request.body.lastname,
                zipcode: request.body.zipcode
              });

              return GnomeUsersAPI.create({
                email: request.body.email,
                password: encryptedPassword,
                firstname: request.body.firstname,
                lastname: request.body.lastname,
                zipcode: request.body.zipcode
              })

              .exec(function (error) {

                  //TODO error handling
                if (error) {
                  return console.log(error);
                }
                else {
                  response.send("success");
                }
              });
            }
        });
    },

    //View all information about the user (from submitted email) including all devices
    viewUser: function (request, response) {
        if(this.authenticated(request, response)) {
            console.log("reached viewUser function.  User is authenticated");
        } else {
            console.log("reached viewUser function.  User is not authenticated");
            return response.forbidden();
        }
        return GnomeUsersAPI.find({where: {email: request.session.email}}).populate('gnomes')
        .exec(function (error, result) {
            //TODO error handling
            if (error) {
                return console.log(error);
            }
            else {
                console.log(result);
                return response.view('dashboard', {gnomes: result, title: 'Gnome @ Home -- Dashboard'});
            }
        });
    },

    viewSubmit: function (request, callback) {
        return GnomeUsersAPI.find({where: {id: request.userID}}).populate('gnomes').exec(function (error, result) {
            //TODO error handling
            if (error) {
                return console.log(error);
            }
            else {
                //console.log(result);
                return callback(null, result);
            }
        });
    }

};
