/**
 * GnomeUsersAPIController
 *
 * @description :: Server-side logic for managing Gnomeusersapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var Passwords = require('machinepack-passwords'); //Password encryption

module.exports = {

	
	addUser: function (request, response) {
		//use helper function (in services folder) to validate
		Passwords.encryptPassword({password:request.body.password}).exec({
      		// An unexpected error occurred encrypting the password.
      		error: function (err){
      			console.log(err);
        		return response.serverError(err);
      		},
      		// OK.
      		success: function (encryptedPassword) {
      			console.log({email:request.body.email,password:encryptedPassword,
	    			firstname:request.body.firstname,
	    			lastname:request.body.firstname,
	    			zipcode:request.body.zipcode});


    			return GnomeUsersAPI.create({email:request.body.email, 
	    			password:encryptedPassword,
	    			firstname:request.body.firstname,
	    			lastname:request.body.firstname,
	    			zipcode:request.body.zipcode})

				.exec(function (error, result) {
		    		if(error){
		    			return console.log(error);
		    		}
		    		else{
		    			//console.log(request.body);
		        		return response.send(request.body);
		        	}
		    	});
    		}
    			    		
    	})
  	},
	
};

