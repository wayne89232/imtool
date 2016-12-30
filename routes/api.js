
// import models: 
// var Example = require('../models').Example;
var _ = require('underscore');
var Skill = require('../models').Skill;
var Location = require('../models').Location;
var crypto = require('crypto');
var Chat = require('../models').Chat;
var User = require('../models').User;


exports.skill_list = function(req, res){
    Skill.findAll().then(function(result){
    	skill_list = _.map(result, function(result){
			return result.dataValues.skill;
		});
        res.json({ data: skill_list });
    });
}

exports.location_list = function(req, res){
    Location.findAll().then(function(result){
    	location_list = _.map(result, function(result){
			return result.dataValues;
		});
        res.json({ data: location_list });
    });
}
exports.save_chat = function(req,res){
    var new_id = crypto.randomBytes(20).toString('hex');
    var new_time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var save_chat = {
        chat_id: new_id,
        user_id: req.body.user_id,
        mission_id: req.body.mission_id,
        content: req.body.content,
        time: new_time
    };

    Chat.create(save_chat).then(function(result){
        res.json({
            msg:"chat"
        });
    });
}

exports.get_mission_chat = function(req,res){
    console.log()
    Chat.findAll({
        where: {
            mission_id: req.params.id
        },
        include: [User]
    }).then(function(result){
        chat_list = _.map(result, function(result){
            return result.dataValues;
        });
        res.json({ data: chat_list });
    });
}