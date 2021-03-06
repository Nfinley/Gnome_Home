/**
 * AllGnomesAPIController
 *
 * @description :: Server-side logic for managing Rougegnomeapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  //Sets gnome to activated status (DRM)
  validateGnome: function (request, callback) {
    var serialNum = request.serial;
    //No Serial # error
    if (!serialNum) {

      return callback(null, {valid:false, message:'No Serial # provided'});
    } 

    else {
      return AllGnomesAPI.findOne({where: {serial: serialNum}}).exec(function (error, result) {
        //console.log(result.avaliable);
        //mysql error
        if(error){
          console.log(error);
          return callback(null, {valid:false, message:'Oops, something went wrong!'});
        }

        //Does not exist error
        else if (result === undefined){
          return callback(null, {valid:false, message:'Serial # not valid'});
        }

        //Gnome is already used error
        else if(result.avaliable === false)
          return callback(null, {valid:false, message:'That serial # is not avaliable'});

        //Gnome serial number valid
        else{
          return AllGnomesAPI.update({serial: serialNum}, {avaliable: false}).exec(function (error) {
            
            //mysql error
            if(error){
              console.log(error);
              return callback(null, {valid:false, message:'Oops, something went wrong!'});
            }

            //Added gnome
            else{
              AllGnomesAPI.update({serial: serialNum}, {avaliable:false}).exec(function () {
                return callback(null, {valid:true, message:'Congrats Gnome Added!'});
              });
            }
              
          });
        }
      });
    }
  },

  createGnome: function(request, response){

    console.log(request.body.serial);
    if(request !== undefined){
      return AllGnomesAPI.create({serial: request.body.serial, avaliable:true}).exec(function (error) {
        if(error){
          console.log(error);
        }
        else{
          return response.send('Added '+request.body.serial);
        }
      });
    }
  }
};


