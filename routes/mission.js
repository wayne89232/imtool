// import models: 
// var Example = require('../models').Example;
var _ = require('underscore');
var Mission = require('../models').Mission;
var User = require('../models').User;
var Toolship = require('../models').Toolship;
var Mission_skill = require('../models').Mission_skill;
var Skill = require('../models').Skill;

var crypto = require('crypto');

exports.create_mission = function(req, res){
	req.checkBody('user_id').notEmpty();
	req.checkBody('title').notEmpty();
	req.checkBody('start_time').notEmpty();
	req.checkBody('recruit_time').notEmpty();
	// req.checkBody('location').notEmpty();

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
		expire_time: req.body.expire_time || 1,
		recruit_time: req.body.recruit_time,
		location_id: req.body.location,
		content: req.body.content || "",
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
		limit: 20,
		include: [User]
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
		},
		include: [User,Toolship] 
	}).then(function(result){
		res.json({ data: result.dataValues });
	}).catch(function(err){
		console.log(err)
		res.send(err);
	});
}

exports.find_tools = function(req, res){

	req.checkParams('id').notEmpty();

	var errors = req.validationErrors();
	if (errors) {
		return res.status(405).json({
			errors: errors
		});
	}
	
	Toolship.findAll({ 
		where:{ 
			mission_id: req.params.id 
		},
		include: [User]
	}).then(function(result){
		var toolList = _.map(result, function(result){
			return result.dataValues;
		});
		res.json({ data: toolList });
	}).catch(function(err){
		console.log(err)
		res.send(err);
	});
}

exports.mission_skills = function(req, res){

	req.checkParams('id').notEmpty();

	var errors = req.validationErrors();
	if (errors) {
		return res.status(405).json({
			errors: errors
		});
	}
	console.log(123)
	
	Mission_skill.findAll({ 
		where:{ 
			mission_id: req.params.id 
		},
		include: [Skill]
	}).then(function(result){
		var skillList = _.map(result, function(result){
			return result.dataValues;
		});
		res.json({ data: skillList });
	}).catch(function(err){
		console.log(err)
		res.send(err);
	});
}


exports.get_tooled = function(req, res){

    req.checkBody('user_id').notEmpty();
    req.checkBody('mission_id').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        return res.status(405).json({
            errors: errors
        });
    }

	var new_id = crypto.randomBytes(20).toString('hex');
	Toolship.create({
		toolship_id: new_id,
		user_id: req.body.user_id,
		mission_id: req.body.mission_id,
		rating: 0,
		feedback: ""
	}).then(function(result){
		res.json({ msg: "Success on getting tooled " + result });
	});
}

exports.fire_tool = function(req, res){
    req.checkBody('toolship_id').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        return res.status(405).json({
            errors: errors
        });
    }

	Toolship.destroy({
		where: {
			toolship_id: req.body.toolship_id
		}
	}).then(function(result){
		res.json({ msg: "Success on untooling " + result });
	});
}

exports.stop_recruit = function(req, res){
	req.checkParams('id').notEmpty();
	var errors = req.validationErrors();
	if (errors) {
		return res.status(405).json({
			errors: errors
		});
	}
	
	Mission.update(
		
			{ state: 'Tooling' },
			{ where:{ mission_id: req.params.id } }
		
	).then(function(result){
		res.json({ data: result.dataValues });
	}).catch(function(err){
		console.log(err)
		res.send(err);
	});
}

exports.end_mission = function(req, res){
	req.checkParams('id').notEmpty();


	var errors = req.validationErrors();
	if (errors) {
		return res.status(405).json({
			errors: errors
		});
	}
	
	Mission.update(
		
			{ state: 'Done' },
			{ where:{ mission_id: req.params.id } }
		
	).then(function(result){
		// Give out feedbacks & rating
		res.json({ data: result.dataValues });
	}).catch(function(err){
		console.log(err)
		res.send(err);
	});
}


exports.rate_tool = function(req, res){
	req.checkBody('mission_id').notEmpty();
	req.checkBody('user_id').notEmpty();


	var errors = req.validationErrors();
	if (errors) {
		return res.status(405).json({
			errors: errors
		});
	}
	
	Toolship.update(
		
			{ rating: req.body.rating, comment: req.body.comment },
			{ where:{ mission_id: req.body.mission_id, user_id: req.body.user_id } }
		
	).then(function(result){
		// Give out feedbacks & rating
		res.json({ data: result.dataValues });
	}).catch(function(err){
		console.log(err)
		res.send(err);
	});
}