var settings = require("../setting/db");
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
		settings.model.mysql.database,
		settings.model.mysql.account,
		settings.model.mysql.password,
		settings.model.mysql.options
	);
var User = require('./User');
var Mission = require('./Mission');
var Feedback = require('./Feedback');

// import models: 
// var Example = require('./example').Example(Sequelize,sequelize);

//add some relations here
// Example.hasMany(People, {foreignKey: 'people_id'});


//export for use in other directory
// exports.Example = Example;
exports.User = User;
exports.Mission = Mission;
exports.Feedback = Feedback;
