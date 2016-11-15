(function ($) {
    "use strict";

    // Global regex patterns
    var validName = /^[A-Za-z]+$/;
    var validNumber = /^[0-9]+$/;
    var validEmail = /(^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$)|(^N\/A$)/;
    var validPass = /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]{8,}$/;

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
        $('#galleryImage').attr("src", $(e.relatedTarget).data("src"));
    });

    // Settings slider on dashboard page
    $('#slider').slideReveal({
        trigger: $("#trigger"),
        push: false,
        overlay: false,
        position: 'right'
    });

    $('#submitEmail').on('click', function (e) {

        e.preventDefault();

        var email = $('#email').val();
        var name = $('#name').val();
        var message = $('#message').val();

        var formData = 'email=' + email + '&name=' + name + '&message=' + message;

        console.log("name is " + name);

        $.ajax({
            type: "POST",
            url: '/contactform',
            data: formData
            // This never fires
        }).done(function (response) {
            console.log('response: ' + response);
            $('#name').val("");
            $('#email').val("");
            $('#message').val("");
            //$.notify("Registration successful!  Please Login <a href=""> here </a> !");
        });

    });

    // Register form on index page
    $('#register-btn').on('click', function (e) {
        e.preventDefault();
        // Initialize error array
        var errors = [];

        // Get input values
        var email = $('#reg-email').val();
        var password = $('#reg-password').val();
        var firstName = $('#reg-fname').val();
        var lastName = $('#reg-lname').val();
        var zipcode = $('#reg-zipcode').val();

        // Validate inputs
        if (!validEmail.test(email)) {
            errors.push("Please enter a valid email address!\n");
        }
        if (!validPass.test(password)) {
            errors.push("Please enter a valid password!\n");
        }
        if (!validName.test(firstName)) {
            errors.push("Please enter a valid first name.\n");
        }
        if (!validName.test(lastName)) {
            errors.push("Please enter a valid last name.\n");
        }
        if (!validNumber.test(zipcode)) {
            errors.push("Please enter a valid zip code.");
        }

        // Check for errors
        if (errors.length > 0) {
            var msg = "";
            errors.forEach(function (error, index) {
                msg += error;
            })
            // Show error notification
            notify(msg, "error");
            return false;
        }

        // Build data string for form data
        var formData = 'email=' + email + '&password=' + password + '&firstname=' + firstName + '&lastname=' + lastName + '&zipcode=' + zipcode;

        // Load the spinner to indicate processing
        initializeSpinner();

        // Run ajax request if no errors occurred
        setTimeout(ajaxCall, 4000);

        function ajaxCall() {
            $.ajax({
                type: "POST",
                url: 'Users/addUser',
                data: formData
            }).done(function (response) {
                console.log('response: ' + response);

                // Remove spinner
                removeSpinner();

                // Clear the form inputs
                $('#reg-form input').val("");

                // Show success notification
                notify("Thank you for registering!  \n Please proceed to the Login.", "success");
            });
        }
    }); // #register-btn handler

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
                position: "right",
                autoHideDelay: 5000
            }
        );
    }

})(jQuery);