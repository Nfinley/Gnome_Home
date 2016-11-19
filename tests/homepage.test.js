/**
 * Created by nigelfinley on 11/16/16.
 */



'use strict';

var Nightmare = require('nightmare');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');



chai.use(chaiAsPromised);
chai.should();


// This test simply checks to see if the website is up and active
describe('Gnome @ Home webpage is active ', function () {
    this.timeout(100000);


    it('should navigate to the the heroku Gnome@Home site and the site should be active', function () {
        var selector = 'title';

        return Nightmare({show: true})
            .goto('https://gnome-home.herokuapp.com//')
            .wait(1000)
            //this logs the title of the app which in this case is "Gnome @ Home"

            .evaluate(function (selector) {
                return document.querySelector(selector).innerText;
            }, selector)

            .then(function (selector) {
                console.log('The title of the our homepage is: ' + selector);
            });

    });

});

//tests to see if the login page works with both a valid email and non-valid email
describe('Test the login modal on Gnome@Home index page', function () {
    this.timeout(100000);


    it('should login into dashboard page using sample user and then logout', function () {


        return Nightmare({show: true})
            .goto('https://gnome-home.herokuapp.com//')
            .wait(1000)
            .click('a[href*="#signinModal"]')
            .wait(1000)
            .type('form[action*="/loginUser"] [name=email]', 'eric@eric.com')
            .type('form[action*="/loginUser"] [name=password]', 'Mx123456e$')
            .click('form[action*="/loginUser"] [type=submit]')
            .wait(7000)
            //takes a screensht of the current page
            .screenshot('./assets/images/testpage.png', {
                x: 10,
                y: 5,
                width: 1000,
                height: 750
            })
            .click('.fa-cog')
            .wait(3000)
            .click('a[href*="/logoutUser"]');



    });


    it('should fail when logging in with incorrect email credentials', function () {

        return Nightmare({show: true})
            .goto('https://gnome-home.herokuapp.com//')
            .wait(1000)
            .click('a[href*="#signinModal"]')
            .wait(1000)
            .type('form[action*="/loginUser"] [name=email]', 'badcrentials.test.com')
            .type('form[action*="/loginUser"] [name=password]', '1234')
            .click('form[action*="/loginUser"] [type=submit]')
            .wait(3000)
            //takes a screensht of the current page
            .screenshot('./assets/images/testpage-badlogin.png', {
                x: 10,
                y: 5,
                width: 1000,
                height: 750
            });
    });

});

// /tests the contacts us section to see if it succesfully sends an email
describe('Test the contact us section of the webpage', function () {
    this.timeout(100000);


    it('should successfully send a message to Gnome @ Home', function () {


        return Nightmare({show: true})
            .goto('https://gnome-home.herokuapp.com//')
            .wait(2000)
            .click('a[href*="#last"]')
            .wait(2000)
            .type('form[id*="emailForm"] [id=name]', 'Automated Nightmare Bot')
            .type('form[id*="emailForm"] [id=email]', 'gnomebot@test.com')
            .type('form[id*="emailForm"] [id=message]', 'This is an email generated from an automated  Nightmare test')

            .click('form[id*="emailForm"] [type=button]')
            .wait(5000)
            .screenshot('./assets/images/emailsentsuccess.png', {
                x: 10,
                y: 5,
                width: 1000,
                height: 750
            });
    });

});



