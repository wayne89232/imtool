var User = require('../models').User;
var Mission = require('../models').Mission;
var Notification = require('../models').Notification;
var _ = require('underscore');
var async = require('async');




exports.get_notifications = function(req, res){

	Notification.findAll({
		where: {
			user_id: req.params.user_id
		}
	}).then(function(result){
		var notifications = _.map(result, function(result){
			return result.dataValues;
		});
		res.json({ data: notifications });
	});
}

//only called in backend, 
exports.notify = function(mission, user, type){
	var new_id = crypto.randomBytes(20).toString('hex');
	var newNotification = {
		notification_id: new_id,
		user_id: user,
		mission_id: mission,
		type: type,
		title: "new notification",
		content: "hi",
	};

	Notification.create(newNotification).then(function(result){
		res.json({
			msg:"notify success"
		});
	});
}

// exports.subscribe = function(req, res){
// 	Notify_issue.create({
// 		issue_id:req.params.id, 
// 		user_id:req.session.user.user_id
// 	}).success(function(){
// 		res.json({msg:"subscirbe success"});
// 		console.log("subscirbe success");	
// 	});
// }

// exports.unsubscribe = function(req, res){
// 	Notify_issue.findAll({
// 		where:{
// 			issue_id:req.params.id, 
// 			user_id:req.session.user.user_id
// 		}
// 	}).success(function(unsubscribe){
// 		// console.log(unsubscribe);
// 		unsubscribe.forEach(function(unsubscribe){
// 			unsubscribe.destroy();
// 		});
// 		res.json({
// 			msg:"unsubscribe success"
// 		});
// 	});
// }