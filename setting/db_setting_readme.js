//copy the whole file into the same directory and name it "local.js"
//todos see below

var sslEnabled = false;
var path  = require('path');

module.exports = {
	
	enviroment: "development",

	port : (process.env.PORT || 3000),

	model: {
		mysql : {
			database: "", //enter the database
			account : "", //root or the account for ur local db
			password: "", //password
			options : {
				host    : "localhost",  //localhost suggested
				dialect: 'mysql',
				logging : false
			}
		}
	},

}