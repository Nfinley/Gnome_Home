/**
 * GnomeModulesAPI.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	serial:{
  		type:'string',
  		size:'128',
  		required: true
  	},
  	status:{
  		type:'boolean',
  		required: true
  	}

  }
};

