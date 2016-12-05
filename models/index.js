var settings = require("../setting/db");
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
		settings.model.mysql.database,
		settings.model.mysql.account,
		settings.model.mysql.password,
		settings.model.mysql.options
	);


// import models: 
// var Example = require('./example').Example(Sequelize,sequelize);
var User = require('./user').User(Sequelize,sequelize);
var Mission = require('./mission').Mission(Sequelize,sequelize);
var Location = require('./location').Location(Sequelize,sequelize);
var Skill = require('./skill').Skill(Sequelize,sequelize);
var Toolship = require('./toolship').Toolship(Sequelize,sequelize);
var User_location = require('./user_location').User_location(Sequelize,sequelize);
var User_skill = require('./user_skill').User_skill(Sequelize,sequelize);
var Mission_skill = require('./mission_skill').Mission_skill(Sequelize,sequelize);


//add some relations here

User.hasMany(Mission, {foreignKey: 'user_id'});
Mission.belongsTo(User, {foreignKey: 'user_id'});

Mission.hasOne(Location, {foreignKey: 'location_id'});
Location.belongsTo(Mission,{foreignKey: 'location_id'});

User.hasMany(User_location,{foreignKey: 'user_id'});
Location.hasMany(User_location,{foreignKey: 'location_id'});
User_location.belongsTo(Location,{foreignKey: 'location_id'});
User_location.belongsTo(User,{foreignKey: 'user_id'});

User.hasMany(User_skill,{foreignKey: 'user_id'});
Skill.hasMany(User_skill,{foreignKey: 'skill_id'});
User_skill.belongsTo(Skill,{foreignKey: 'skill_id'});
User_skill.belongsTo(User,{foreignKey: 'user_id'});


User.hasMany(Toolship,{foreignKey: 'user_id'});
Mission.hasMany(Toolship,{foreignKey: 'mission_id'});
Toolship.belongsTo(Mission,{foreignKey: 'mission_id'});
Toolship.belongsTo(User,{foreignKey: 'user_id'});

Skill.hasMany(Mission_skill,{foreignKey: 'skill_id'});
Mission.hasMany(Mission_skill,{foreignKey: 'mission_id'});
Mission_skill.belongsTo(Skill,{foreignKey: 'skill_id'});
Mission_skill.belongsTo(Mission,{foreignKey: 'mission_id'});

//export for use in other directory
// exports.Example = Example;

exports.User = User;
exports.Mission = Mission;
exports.Location = Location;
exports.Skill = Skill;
exports.Toolship = Toolship;
exports.User_location = User_location;
exports.User_skill = User_skill;
exports.Mission_skill = Mission_skill;

