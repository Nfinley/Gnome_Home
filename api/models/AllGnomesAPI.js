/**
 * AllGnomesAPI.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  	attributes: {
  		//Serial # of device
	  	serial:{
	  		type:'string',
	  		size:'128',
	  		required: true
	  	},
	  	
	  	//Is device avaliable, (verifies that device exists, kinda DRMish)
	  	avaliable:{
  			type:'boolean',
  			required: true
  		}
  	}
};

