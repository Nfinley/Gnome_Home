/**
 * DashboardController
 *
 * @description :: Server-side logic for managing Dashboardcontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    // Make sure that user is authenticated before page is loaded. Deny access if not authenticated.
	authenticate: function(request, response) {
        console.log('reached dashboard controller')
        if(request.session.authenticated) {
            console.log('User ' + request.session.userId + ' is authenticated!')
            // response.locals.userId = request.session.userId;
            // response.locals.firstName = request.session.firstName;
            // response.locals.email = request.session.email;
            // Continue to 'view' property in route (the dashboard)
            return next()
        } else {
            console.log('User is not authenticated!')
            return response.forbidden()
        }
    }
};

