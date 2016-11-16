
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