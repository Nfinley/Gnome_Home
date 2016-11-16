/**
 * Created by nigelfinley on 11/15/16.
 */


'use strict';

// User story: As a user I want to be able to:
// 1. Navigate to the gnome at home website
// 2. Login into my dashboard
// 3. Turn a gnome on/off


var Nightmare = require('nightmare');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');


chai.use(chaiAsPromised);
chai.should();

describe('Gnome @ Home navigation and dashboard login ', function () {
    this.timeout(100000);


    it('should navigate to the the heroku Gnome@Home site and log into the dashboard using test login', function () {


        return Nightmare({ show : true })
            .goto('https://polar-thicket-83937.herokuapp.com/')
            .wait(1000)
            .click('a[href*="#signinModal"]')
            .wait(1000)
            .type('form[action*="/Session/loginUser"] [name=email]', 'eric@eric.com')
            .type('form[action*="/Session/loginUser"] [name=password]', 'Mx123456e$')
            .click('form[action*="/Session/loginUser"] [type=submit]')
            .wait(5000)
            .evaluate(function(){
                return document.title;
            })
            //this logs the title of the app which in this case is "New Sails App"
            .end()
            .then(function(title) {
                console.log(title);
            });

    });

//
//
    it('should turn the light switch on and on off an return the ids of both scenerios', function () {

    return Nightmare()

        .click ('span[".onoffswitch-inner"] [name=onoffsiwth');


        // Make sure there are multiple courses
        // .evaluate(function () {
        //   return document.querySelectorAll('list-group-item clearfix');
        // })
        // .then(function (homework_count) {
        //   homework_count.should.be.above(1)
        // })
    });
//
//     // it('should ', function () {
//     //     throw new Error('Failed on purpose, just to make the Mocha output more interesting.');
//     // });
//
});

    // .end()
    //
    // .then(function (result) {
    //     console.log(result)
    // })
    //
    //

