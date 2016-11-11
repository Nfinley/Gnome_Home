/**
 * GnomeModulesAPIController
 *
 * @description :: Server-side logic for managing gnomemodulesapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	getGnomeStatus: function (request, response) {
    	GnomeAPI.findOne({serial:request.params.serial}).exec(function (error, result) {
    		console.log(request.params.serial);
        	return response.send(result.status);
    	});
  	},
  	changeGnome: function (request, response) {
  		//console.log(request.body.serial);
  		GnomeAPI.update({serial:request.body.serial}, {status:request.body.status}).exec(function (error, result) {
  		return response.redirect('/GnomeAPI');


  		});
  	}



	
};

