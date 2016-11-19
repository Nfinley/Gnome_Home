$(document).ready(function(){

    $('.statusButton').each(function(){
        var deviceTime = $(this).data('time');
        var currentTime = new Date();

        var difference = Math.abs(Date.parse(currentTime)-Date.parse(deviceTime));

        if(difference>60000){
            $(this).addClass('btn-danger');
            $(this).html("OFFLINE");
            console.log("offline");
        }
        else{
            $(this).addClass('btn-success');
            $(this).html("ONLINE");
            console.log("online");
        }
    });

    //Set button to already existing condition
    $('.onoffswitch-checkbox').each(function(){
        status = $(this).data('status');
        name = $(this).attr('name');
        if(status === 'true'){
            $('#'+name+'Click').trigger('click');
        }
    });

    //Change button to new condition and send response to server
    $('.onoffswitch-checkbox').click(function(e){
        $('div.spinner-div').html('<div class="spinner">Loading...</div>');

        //Store serial and status information into json
        var dataObj={serial:$(this).attr('id'), status:$(this).data('status')};

        //Set button to opposite boolean value
        if(dataObj.status === 'true' || dataObj.status === true ){
            $(this).data('status','false');
        }
        else{
            $(this).data('status','true');
        }
        //Set new value into button
        var status = $(this).data('status');
        dataObj.status = status;
        console.log(dataObj);

        //Send status to server
         $.ajax({url: '/GnomeAPI/changeGnome', data:dataObj, method: 'POST'})
        .done(function() {
            $('div.spinner-div').empty();
            e.preventDefault();
        });
     });

    //Show message when trying to add a device
    if($('#addMessage').html()!== ''){

        $('#ResultGnomeModal').modal('show');
    }

});

(function ($) {
    'use strict';

    // Global regex patterns
    var validName = /^[A-Za-z]+$/;
    var validNumber = /^[0-9]+$/;
    var validEmail = /(^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$)|(^N\/A$)/;
    var validPass = /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]{8,}$/;

    // Global delay for spinner processing
    var timeDelay = 4000;

    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 60
    });

    new WOW().init();

    $('a.page-scroll').bind('click', function (event) {
        var $ele = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($ele.attr('href')).offset().top - 60)
        }, 1450, 'easeInOutExpo');
        event.preventDefault();
    });

    $('#collapsingNavbar li a').click(function () {
        /* always close responsive nav after click */
        $('.navbar-toggler:visible').click();
    });

    $('#galleryModal').on('show.bs.modal', function (e) {
        $('#galleryImage').attr('src', $(e.relatedTarget).data('src'));
    });

    // Settings slider on dashboard page
    $('#slider').slideReveal({
        trigger: $('#trigger'),
        push: false,
        overlay: false,
        position: 'right'
    });

    // Use backstretch plugin for responsive images
    $('#pic-about-us').backstretch("images/gnome_about_us.jpg");

    $(".index-carousel").backstretch([
        "images/italy.jpg",
        "images/matryoshka.jpg",
        "images/home.jpg"
    ], {
        fade: 4000,
        duration: 6000
    });

    // Login modal form on index page
    $('#signin-btn').on('click', function(e) {
        e.preventDefault();
        // Initialize error array
        var errorArr = [];

        // Get input values
        var email = $('#signin-email').val();
        var password = $('#signin-password').val();

        // Validate inputs
        if(!validEmail.test(email)) {
            errorArr.push('Please enter a valid email address! \n');
        }
        if(!password) {
            errorArr.push('Please enter a valid password!');
        }

        // Check for errors
        if(checkErrors(errorArr)) {
            return false;
        }

        // Load the spinner to indicate processing
        initializeSpinner();

        // Build data string for form data
        var formData = 'email=' + email + '&password=' + password;

        // Submit data to server
        $.ajax({
            type: 'POST',
            url: '/loginUser',
            data: formData
        // Note: the following will only fire if login was unsuccessful
        // Return string "error" == server/mysql error
        // Return string "login-fail" == user incorrect info submission
        // Return string "success" == user verified, and will be redirected to dashboard page
        }).done(function (response) {
            console.log('response: ' + response);
            // Delay success actions to simulate processing
            setTimeout(function() {
                // Remove spinner
                removeSpinner();

                // Notify user of errors
                if(response == 'login-fail') {
                    notify('You entered in incorrect email or password. \n Please try again.', 'error');
                } else if (response == 'error') {
                    notify('We are sorry, but there was an internal error. \n Please contact our team if it persists.', 'error');
                } else if (response == 'success') {
                    //window.location.href = "/Dashboard/" + email;
                    window.location.href = '/Dashboard';
                }
            }, timeDelay);
        });
    });

    // Contact form on index page
    $('#submitEmail').on('click', function (e) {
        e.preventDefault();

        // Initialize error array
        var errorArr = [];

        // Get input values
        var email = $('#email').val();
        var name = $('#name').val();
        var message = $('#message').val();

        // Validate inputs
        if(!validEmail.test(email)) {
            errorArr.push('Please enter a valid email address! \n');
        }
        if(!name) {
            errorArr.push('Please enter a valid name! \n');
        }
        if(!message) {
            errorArr.push('Please enter a valid message! \n');
        }

        // Check for errors
        if(checkErrors(errorArr)) {
            return false;
        }

        // Load the spinner to indicate processing
        initializeSpinner();

        // Build data string for form data
        var formData = 'email=' + email + '&name=' + name + '&message=' + message;

        // Submit data to server
        $.ajax({
            type: 'POST',
            url: '/contactform',
            data: formData
        }).done(function (response) {
            // Delay success actions to simulate processing
            setTimeout(function() {
                console.log('response: ' + response);

                // Remove spinner
                removeSpinner();

                // Clear form inputs
                $('#name').val('');
                $('#email').val('');
                $('#message').val('');

                // Show the success notification
                notify('Your message was sent. \n Thank you for contacting us!  \n A gnome will get back to you shortly.', 'success');
            }, timeDelay);
        });
    }); // END contact form button handler

    // Register form on index page
    $('#register-btn').on('click', function (e) {
        e.preventDefault();
        // Initialize error array
        var errorArr = [];

        // Get input values
        var email = $('#reg-email').val();
        var password = $('#reg-password').val();
        var firstName = $('#reg-fname').val();
        var lastName = $('#reg-lname').val();
        var zipcode = $('#reg-zipcode').val();

        // Validate inputs
        if (!validEmail.test(email)) {
            errorArr.push('Please enter a valid email address!\n');
        }
        if (!validPass.test(password)) {
            errorArr.push('Please enter a valid password!\n');
        }
        if (!validName.test(firstName)) {
            errorArr.push('Please enter a valid first name.\n');
        }
        if (!validName.test(lastName)) {
            errorArr.push('Please enter a valid last name.\n');
        }
        if (!validNumber.test(zipcode)) {
            errorArr.push('Please enter a valid zip code.');
        }

        // Check for errors, and display any if necessary
        if(checkErrors(errorArr)) {
            return false;
        }

        // Load the spinner to indicate processing
        initializeSpinner();

        // Build data string for form data
        var formData = 'email=' + email + '&password=' + password + '&firstname=' + firstName + '&lastname=' + lastName + '&zipcode=' + zipcode;

        // Submit data to server
        $.ajax({
            type: 'POST',
            url: 'Users/addUser',
            data: formData
        }).done(function (response) {
            // Delay success actions to simulate processing
            setTimeout(function() {
                console.log('response: ' + response);

                // Remove spinner
                removeSpinner();

                // Clear the form inputs
                $('#reg-form input').val('');

                // Show success notification
                notify('Thank you for registering!  \n Please proceed to the Login.', 'success');

                // Show the sign in modal, and populate form inputs with user-supplied data
                $('#signin-email').val(email);
                $('#signin-password').val(password);
                $('#signinModal').modal('show');
            }, timeDelay);
        });
    }); // END register form button handler

    // Show form errors if any occurred
    function checkErrors(errorArr) {
        if (errorArr.length > 0) {
            var msg = '';
            errorArr.forEach(function (error) {
                msg += error;
            });
            // Show error notification
            notify(msg, 'error');
            return true;
        } else {
            return false;
        }
    }

    // Load the spinner
    function initializeSpinner() {
        $('div.spinner-div').html('<div class="spinner">Loading...</div>');
    }

    // Remove the spinner
    function removeSpinner() {
        $('div.spinner-div').empty();
    }

    // Return globally-positioned notification, from notify js plugin
    function notify(msg, type) {
        return $.notify(
            msg,
            type,
            {
                position: 'right',
                autoHideDelay: 5000
            }
        );
    }

})(jQuery);