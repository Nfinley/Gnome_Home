/**
 * GnomeUsersAPI.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {
	  	username:{
		  		type:'string',
		  		size:'128',
		  		required: true
		},
		password:{
	  			type:'string',
		  		size:'128',
		  		required: true
		},
		email:{
	  			type:'string',
		  		size:'128',
		  		required: true
		},
		zipcode:{
	  			type:'string',
		  		size:'5',
		  		required: true
		},
		gnomes:{
			collection: 'gnomeDeviceAPI',
			via: 'owner'
		}
	}
};

