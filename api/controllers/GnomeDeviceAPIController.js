/**
 * GnomeModulesAPIController
 *
 * @description :: Server-side logic for managing gnomemodulesapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	getGnomeStatus: function (request, response) {
    	return GnomeDeviceAPI.findOne({serial:request.params.serial}).exec(function (error, result) {
        if(error){
          return 0;
        }
        else{
    		  console.log(request.params.serial);
          return response.send(result.status);
        }
    	});
  	},
  	changeGnome: function (request, response) {
  		//console.log(request.body.serial);
  		return GnomeDeviceAPI.update({serial:request.body.serial}, {status:request.body.status}).exec(function (error, result) {
  		  return response.redirect('/GnomeAPI');
  		});
  	}
};

