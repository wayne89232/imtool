var settings = require("./setting/db.js");
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
		settings.model.mysql.database,
		settings.model.mysql.account,
		settings.model.mysql.password,
		settings.model.mysql.options
	);

// import models for syncing
// var Example = require('./models').Example;




// Sync database with below
// Example.sync({force: true});