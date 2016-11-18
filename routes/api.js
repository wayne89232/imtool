
// import models: 
// var Example = require('../models').Example;
var _ = require('underscore');
var Skill = require('../models').Skill;
var Location = require('../models').Location;


exports.skill_list = function(req, res){
    Skill.findAll().then(function(result){
    	skill_list = _.map(result, function(result){
			return result.dataValues;
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