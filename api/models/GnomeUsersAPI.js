/**
 * GnomeUsersAPI.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {
		
		//Email (and login) of user
		email:{
	  			type:'string',
		  		size:'128',
		  		required: true,
		  		email: true //checks for email
		},

		//Password of user
		password:{
	  			type:'string',
		  		size:'128',
		  		required: true
		},
		//Firstname of user
		firstname:{
		  		type:'string',
		  		size:'128',
		  		required: true
		},
		//Lastname of user
		lastname:{
		  		type:'string',
		  		size:'128',
		  		required: true
		},

		//Zipcode of user (weather API may be used in future)
		zipcode:{
	  			type:'string',
		  		size:'5',
		  		required: true
		},

		//Collection of all gnomes user has
		gnomes:{
			collection: 'gnomeDeviceAPI',
			via: 'owner'
		}
	}
};

