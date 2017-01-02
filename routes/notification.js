var User = require('../models').User;
var Mission = require('../models').Mission;
var Notification = require('../models').Notification;
var _ = require('underscore');
var async = require('async');
var crypto = require('crypto');




exports.get_notifications = function(req, res){

	Notification.findAll({
		where: {
			user_id: req.params.id
		},
		order: [['createdAt', 'DESC']]
	}).then(function(result){
		var notifications = _.map(result, function(result){
			return result.dataValues;
		});

		var count = 0;
		async.each(result,function (element,callback) {
			var elementData = element.dataValues

			var query = {
				where: {
					mission_id: elementData.mission_id
				}
			}
			Mission.findOne(query).then(function(result){
				notifications[count].mission_title = result.dataValues.title
				count++;
				callback()
			}).catch(function(error){
				count++;
				callback(error)
			})


		},function(error){
			if (error)
				console.log(error)
			else
				res.json({ data: notifications });
		})
		
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

	return Notification.create(newNotification).then(function(result){
		// res.json({
		// 	msg:"notify success"
		// });
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