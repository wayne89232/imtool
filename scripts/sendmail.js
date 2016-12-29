var nodemailer 	= require('nodemailer');
var Q     		= require('q');
var crypto 		= require('crypto');

var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: 'rick830620@gmail.com', // my mail
        pass: 'rick83062'
    }
}));

// create reusable transporter object using the default SMTP transport 
// var transporter = nodemailer.createTransport('smtps://rick830620@gmail.com:rick83062@smtp.gmail.com');
 
// setup e-mail data with unicode symbols 
var mailOptions = {
    from: '"IMTOOL" <rick830620@gmail.com>', // sender address 
    to: '', // list of receivers 
    subject: 'IMTOOL EMAIL Verification', // Subject line
};

var main = function(emailAddress){

	var deffered = Q.defer();
	var emailAccount = emailAddress.split('@')[0];

	var verStr = crypto.createHash('md5').update('imtool' + emailAccount).digest('hex').substring(0,6);;
	var message = "Thanks for registering to IMTOOL, There is your Verification number, " + verStr;

	mailOptions.text = message;
	mailOptions.to = emailAddress;

	// send mail with defined transport object 
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
			deffered.reject(error)
	    }else{
			deffered.resolve(verStr)
		}
	});

	return deffered.promise;

}

// run main if this file is directly executed.
if (require.main === module) {
	main("b01705001@ntu.edu.tw");
}

module.exports = main;