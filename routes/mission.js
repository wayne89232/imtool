// import models: 
// var Example = require('../models').Example;
var _ = require('underscore');
var Mission = require('../models').Mission;
var User = require('../models').User;
var Toolship = require('../models').Toolship;

var crypto = require('crypto');

exports.create_mission = function(req, res){

	req.checkBody('user_id').notEmpty();
	req.checkBody('title').notEmpty();
	req.checkBody('start_time').notEmpty();
	req.checkBody('expire_time').notEmpty();
	req.checkBody('recruit_time').notEmpty();
	req.checkBody('location').notEmpty();
	req.checkBody('content').notEmpty();

	var errors = req.validationErrors();
	if (errors) {
    	return res.status(405).json({
    		errors: errors
		});
	}


	var new_id = crypto.randomBytes(20).toString('hex');
	var newMission = {
		mission_id: new_id,
		user_id: req.body.user_id,
		title: req.body.title,
		photo_url: "",
		start_time: req.body.start_time,
		expire_time: req.body.expire_time,
		recruit_time: req.body.recruit_time,
		location_id: req.body.location,
		content: req.body.content,
		state: 'Recruiting'
	};

	Mission.create(newMission).then(function(result){
		var succesMsg = "User " + result.dataValues.user_id + " Success on creating mission " + result.dataValues.title;

		res.json({
			success: true,
			msg: succesMsg
		});
	}).catch(function(err){
		res.send(err);
	});
}

//use query to filter missions
exports.list_mission = function(req, res){

	var query = {
		order: [
			['recruit_time', 'DESC'],
			['start_time', 'DESC'],
			['expire_time', 'DESC'],
		],
		limit: 20
	}

	if (req.body.state){
		req.checkBody('state').isMissionState();

		var errors = req.validationErrors();
		if (errors) {
			return res.status(405).json({
				errors: errors
			});
		}

		query.where = {
			state: req.body.state
		}

	}

	Mission.findAll(query).then(function(result){
		var missionList = _.map(result, function(result){
			return result.dataValues;
		});
		res.json({ data: missionList });
	});
}

exports.view_event = function(req, res){

	req.checkParams('id').notEmpty();

	var errors = req.validationErrors();
	if (errors) {
		return res.status(405).json({
			errors: errors
		});
	}
	
	Mission.find({ 
		where:{ 
			mission_id: req.params.id 
		} 
	}).then(function(result){
		res.json({ data: result.dataValues });
	}).catch(function(err){
		res.send(err);
	});
}

exports.get_tooled = function(req, res){
	var new_id = crypto.randomBytes(20).toString('hex');
	Toolship.create({
		toolship_id: new_id,
		user_id: req.params.user_id,
		mission_id: req.params.mission_id,
		rating: 0,
		feedback: ""
	}).then(function(result){
		res.json({ msg: "Success on getting tooled " + result });
	});
}
