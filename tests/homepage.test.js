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
describe('Test the login modal on Gnome@Home index page ', function () {
    this.timeout(100000);


    it('should login into dashboard page using sample user', function () {


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
                x: 20,
                y: 10,
                width: 1000,
                height: 1000
            });


    });
    it('should fail when logging in with bad credentials', function () {

        return Nightmare({show: true})
            .goto('https://gnome-home.herokuapp.com//')
            .wait(1000)
            .click('a[href*="#signinModal"]')
            .wait(1000)
            .type('form[action*="/loginUser"] [name=email]', 'testme.test.com')
            .type('form[action*="/loginUser"] [name=password]', '1234')
            .click('form[action*="/loginUser"] [type=submit]')

            .screenshot('./assets/images/faillogin.png', {
                x: 20,
                y: 10,
                width: 1000,
                height: 1000
            });
    });
});


// describe('homepage', function(){
//     it('should respond to GET',function(done){
//         superagent
//             .get('http://localhost:'+port)
//             .end(function(res){
//                 expect(res.status).to.equal(200);
//                 done();
//             })
//     })



