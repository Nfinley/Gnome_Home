/**
 * GnomeModulesAPIController
 *
 * @description :: Server-side logic for managing gnomemodulesapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  //Takes in the serial number and returns its status (ie. On or Off)
  //Used by gnome devices
	getGnomeStatus: function (request, response) {

    //console.log(request.params.serial);
    return GnomeDeviceAPI.findOne({serial:request.params.serial}).exec(function (error, result) {
      
      if(error){

        //TODO error handling
        return console.log(error);
      }
      else if (result === undefined){
        console.log(request.params.serial+' is not validated');

      }

      else{

        console.log(request.params.serial);
        return response.send(result.status);
      }
    });
  },

  //Takes in the serial number and changes its status (ie. On or Off)
  //Used by gnome devices
	changeGnome: function (request, response) {
    console.log(request.body);
    //console.log(request.body.serial, request.body.status);
    return GnomeDeviceAPI.update({serial:request.body.serial}, {status:request.body.status}).exec(function (error) {

      if(error){

        //TODO error handling
        return console.log(error);
      }

      else{
        return response.redirect('/GnomeAPI');
      }
    });
	},

  //Creates a new gnome as a usuable gnome, to be used by the user (Will be used by a Service)
  //Created by user
  createGnome: function (request, response) {
    

    return AddGnomeService.validateGnome(request.body.serial, function(err, result){

      console.log(result.valid, result.message);
      if(result.valid === true){

        return GnomeDeviceAPI.create({serial:request.body.serial, status:false, nickname:request.body.nickname, owner:request.body.userid.trim()}).exec(function (error) {
          if(error){

            //TODO error handling
            return console.log(error);
          }
        
          else{
            AddGnomeService.getAllGnomes(request.body.userid.trim(), function(err, result){
              console.log(result);

              var resultArr = [result[0]];
              return response.view('dashboard', {gnomes:resultArr, title: 'Gnome @ Home -- Dashboard'});
              });
          }
        });
      }
    });
  },

  //Removes a gnome as a usuable gnome, to be used by the user (Will be used by a Service)
  //Deleted by user
  deleteGnome: function (request, response) {

    //console.log(request.body.serial);
    return GnomeDeviceAPI.delete({where:{serial:request.body.serial}}).exec(function (error) {
      if(error){

        //TODO error handling
        return console.log(error);
      }
      
      else{
        return response.redirect('/GnomeAPI');
      }
    });
  }
};

