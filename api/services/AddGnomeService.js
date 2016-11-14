
var AllGnomesAPI = require('./../controllers/AllGnomesAPIController');
//var GnomeUsersAPI = require('./../controllers/GnomeUsersAPIController');

module.exports = {

  validateGnome: function (serialNum){
		//console.log(options);

		//var isValid = AllGnomesAPI.addGnome(options)
		//console.log(isValid);
    AllGnomesAPI.validateGnome({serial:serialNum}, function(err, options){

      console.log(options);
    });
  }
};