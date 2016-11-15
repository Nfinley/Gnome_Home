var nodemailer = require('nodemailer');

module.exports = {
    sendEmail: function (req, res) {
        smtpTrans = nodemailer.createTransport('SMTP', {
            service: 'Gmail',
            auth: {
                user: "gnomedahome@gmail.com",
                pass: "Gnome@Home"
            }
        });
        //Mail options

        mailOpts = {
            from: req.body.name + ' &lt;' + req.body.email + '&gt;' + req.body.email, //grab form data from the request body object
            to: 'gnomedahome@gmail.com',
            subject: 'Website contact form',
            text:"Name: "+ req.body.name + "\n" +"Email: "+ req.body.email + "\n" +"Message: " + req.body.message

        };


        smtpTrans.sendMail(mailOpts, function (error, response) {
            //Email not sent
            if (error) {
                console.log("error" + error);
            }
            //Yay!! Email sent
            else {
                res.send('success')

            }
        });


    }


};