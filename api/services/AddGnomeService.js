
var AllGnomesAPI = require('./../controllers/AllGnomesAPIController');
var GnomeUsersAPI = require('./../controllers/GnomeUsersAPIController');

module.exports = {

	validateGnome: function (serialNum, callback){
		//console.log(options);

		//var isValid = AllGnomesAPI.addGnome(options)
		//console.log(isValid);
		AllGnomesAPI.validateGnome({serial:serialNum}, function(err, options){

			return callback(null, options);
		});
	},

	getAllGnomes: function (userID, callback){
		//console.log(options);

		//var isValid = AllGnomesAPI.addGnome(options)
		//console.log(isValid);
		GnomeUsersAPI.viewSubmit({userID:userID}, function(err, options){
			// console.log(err, options);
			return callback(null, options);
		});
	}
};