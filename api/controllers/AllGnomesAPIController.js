/**
 * AllGnomesAPIController
 *
 * @description :: Server-side logic for managing Rougegnomeapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  //Sets gnome to activated status (DRM)
  changeGnome: function (request, response) {
      //console.log(request.body.serial);
    if (!request.body.status) {
            //TODO error function
      return response.redirect('/GnomeAPI');
    } else {
            //TODO VALIDATE
      return AllGnomesAPI.update({serial: request.body.serial}, {status: request.body.status}).exec(function () {
        return response.redirect('/GnomeAPI');
      });
    }
  }
	
};


