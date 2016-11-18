// import models: 
// var Example = require('../models').Example;
var _ = require('underscore');
var Mission = require('../models').Mission;

exports.create_mission = function(req, res){
	var new_id = crypto.randomBytes(20).toString('hex');
	Mission.create({
		event_id: new_id,
		title: req.body.title,
		photo_url: "",
		mission_date: req.body.mission_date,
		expire_time: req.body.expire_time,
		location: req.body.location,
		content: req.body.content
	}).then(function(result){
		res.json({ msg: "Success on creating mission " + result });
	});
}

//use query to filter missions
exports.list_mission = function(req, res){
	var query = {
		where: {
			status: req.body.status
		}
	}
	Mission.findAll(query).then(function(result){
		mission_list = _.map(result, function(result){
			return result.dataValues;
		});
		res.json({ data: mission_list });
	});
}

exports.view_event = function(req, res){
	Mission.find({ 
		where:{ 
			mission_id: req.params.mission_id 
		} 
	}).then(function(result){
		res.json({ data: result.dataValues });
	});
}
