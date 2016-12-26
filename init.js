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

var User = require('./models').User;
var Mission = require('./models').Mission;
var Location = require('./models').Location;
var Skill = require('./models').Skill;
var Toolship = require('./models').Toolship;
var User_location = require('./models').User_location;
var User_skill = require('./models').User_skill;
var Mission_skill = require('./models').Mission_skill;
var Notification = require('./models').Notification;
var Chat = require('./models').Chat;


// Sync database with below
// Example.sync({force: true});

User.sync({force: true});
Mission.sync({force: true});
Location.sync({force: true});
Skill.sync({force: true});
Toolship.sync({force: true});
User_location.sync({force: true});
User_skill.sync({force: true});
Notification.sync({force: true});
Mission_skill.sync({force: true});
Chat.sync({force: true});