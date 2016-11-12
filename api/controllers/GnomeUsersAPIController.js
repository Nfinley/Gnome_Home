/**
 * GnomeUsersAPIController
 *
 * @description :: Server-side logic for managing Gnomeusersapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var Passwords = require('machinepack-passwords'); //Password encryption

module.exports = {

	//Add a user to the database, encrypt submitted password
	addUser: function (request, response) {

		//TODO use helper function (in services folder) to validate criteria
		Passwords.encryptPassword({password:request.body.password}).exec({
      		error: function (err){

      			//TODO error handling
      			console.log(err);
        		return response.serverError(err);
      		},
      		success: function (encryptedPassword) {
      			console.log({email:request.body.email,password:encryptedPassword,
	    			firstname:request.body.firstname,
	    			lastname:request.body.lastname,
	    			zipcode:request.body.zipcode});

    			return GnomeUsersAPI.create({email:request.body.email,
	    			password:encryptedPassword,
	    			firstname:request.body.firstname,
	    			lastname:request.body.lastname,
	    			zipcode:request.body.zipcode})

				.exec(function (error, result) {

					//TODO error handling
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

  	//View all information about the user (from submitted email) including all devices
  	viewUser:function (request, response){
  		return GnomeUsersAPI.find({where:{email:request.params.email}}).populate('gnomes')
  		.exec(function (error, result) {

  			//TODO error handling
    		if(error){
    			return console.log(error);
    		}
    		else{
          //return response.view('homepage', {title:'Eric'});
    			return response.json(result);
    		}
    	});
  	}
};
