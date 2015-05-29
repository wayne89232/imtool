var settimns = require("../setting/db");
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
		settimns.model.mysql.database,
		settimns.model.mysql.account,
		settimns.model.mysql.password,
		settimns.model.mysql.options
	);

// import models: 
// var Example = require('./example').Example(Sequelize,sequelize);

//add some relations here
// Example.hasMany(People, {foreignKey: 'people_id'});

//export for use in other directory
// exports.Example = Example;