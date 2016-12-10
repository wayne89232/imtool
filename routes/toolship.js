// import models: 
// var Example = require('../models').Example;
var _ = require('underscore');
var Mission = require('../models').Mission;
var User = require('../models').User;
var Toolship = require('../models').Toolship;

var crypto = require('crypto');

exports.create_toolship = function(req, res){

	var member_id;
	req.checkBody('username').notEmpty(); //member in this toolship
	req.checkBody('title').notEmpty(); //name of toolship
	
	var errors = req.validationErrors();
	if (errors) {
    	return res.status(405).json({
    		errors: errors
		});
	}

	var query = {
		attributes:['user_id']
	}
	query.where = {
		account: req.body.username
	}
	User.findAll(query).then(function(result){
		member_id = _.map(result, function(result){
			return result.dataValues;
		});

		var new_id = crypto.randomBytes(20).toString('hex');
		var user = member_id[0].user_id;

	 	var newToolship = {
			toolship_id: new_id,
			title: req.body.title,
			user_id: user
		};
	
		Toolship.create(newToolship).then(function(result){
			var succesMsg = "User " + result.dataValues.user_id + " Success on creating toolship " + result.dataValues.title;

			res.json({
				success: true,
				msg: succesMsg
			});
		}).catch(function(err){
			res.send(err);
		});
	}); 
}
exports.my_toolship = function(req, res){

	req.checkBody('username').notEmpty(); //member in this toolship
	//req.checkBody('title').notEmpty(); //name of toolship

	var member_id;

	var query = {
		attributes:['user_id']
	}
	query.where = {
		account: req.body.username
	}
	User.findAll(query).then(function(result){
		member_id = _.map(result, function(result){
			return result.dataValues;
		});
	});

	var queryToolship = {
			attributes:['title']
		}
	queryToolship.where = {
		user_id:　member_id
	}

	Toolship.findAll(queryToolship).then(function(result){
		var toolshipList = _.map(result, function(result){
			return result.dataValues;
		});
		res.json({ data: toolshipList });
	});

}
exports.list_toolship = function(req, res){

	

	// if (member_id){
	// 	//req.checkBody('state').isMissionState();

	// 	var errors = req.validationErrors();
	// 	if (errors) {
	// 		return res.status(405).json({
	// 			errors: errors
	// 		});
	// 	}

	// 	var queryID.where = {
	// 		user_id: member_id
	// 	}

	// }
		var query = {
			attributes:['title']
		}	
	

	Toolship.findAll(query).then(function(result){
		var toolshipList = _.map(result, function(result){
			return result.dataValues;
		});
		res.json({ data: toolshipList });
	});
}

exports.getmembers = function(req, res){
	
	var memberList;
	var membername = new Array();

	req.checkParams('title').notEmpty();

	var query = {
		attributes: ['user_id']
	}
	query.where = {
		title: req.params.title
	}
	Toolship.findAll(query).then(function(result){
		memberList = _.map(result, function(result){
			return result.dataValues;
		});
		
			var queryMember = {
				attributes: ['account']
			}
			queryMember.where = {
				user_id: memberList
			}

			User.findAll(queryMember).then(function(result){
				var accountList = _.map(result, function(result){
						return result.dataValues;
					});
				//res.json({members: accountList});
				//membername.push(accountList[0].account);
				res.send(accountList);
			});
		// for(i = 0; i < memberList.length;i++){
			
		// 	//accountList.push(memberList[i].user_id);
		// 	var queryMember = {
		// 		attributes: ['account']
		// 	}
		// 	queryMember.where = {
		// 		user_id: memberList[i].user_id
		// 	}

		// 	User.findAll(queryMember).then(function(result){
		// 		var accountList = _.map(result, function(result){
		// 				return result.dataValues;
		// 			});
		// 		//res.json({members: accountList});
		// 		membername.push(accountList[0].account);
		// 	});
		// }
		//res.send(membername);
	});
	//get account name by user_id
	// var queryMember = {
	// 	attributes: ['account']
	// }
	// queryMember.where = {
	// 	user_id: memberList["user_id"]
	// }

	// User.findAll(queryMember).then(function(result){
	// 	accountList = _.map(result, function(result){
	// 		return result.dataValues;
	// 	});
	// 	res.json({members: accountList});
	// });
	
}

// exports.view_event = function(req, res){

// 	req.checkParams('id').notEmpty();

// 	var errors = req.validationErrors();
// 	if (errors) {
// 		return res.status(405).json({
// 			errors: errors
// 		});
// 	}
	
// 	Mission.find({ 
// 		where:{ 
// 			mission_id: req.params.id 
// 		} 
// 	}).then(function(result){
// 		res.json({ data: result.dataValues });
// 	}).catch(function(err){
// 		res.send(err);
// 	});
// }

// exports.get_tooled = function(req, res){
// 	var new_id = crypto.randomBytes(20).toString('hex');
// 	Toolship.create({
// 		toolship_id: new_id,
// 		user_id: req.params.user_id,
// 		mission_id: req.params.mission_id,
// 		rating: 0,
// 		feedback: ""
// 	}).then(function(result){
// 		res.json({ msg: "Success on getting tooled " + result });
// 	});
// }

//use query to filter missions
// exports.list_mission = function(req, res){

// 	var query = {
// 		order: [
// 			['recruit_time', 'DESC'],
// 			['start_time', 'DESC'],
// 			['expire_time', 'DESC'],
// 		],
// 		limit: 20
// 	}

// 	if (req.body.state){
// 		req.checkBody('state').isMissionState();

// 		var errors = req.validationErrors();
// 		if (errors) {
// 			return res.status(405).json({
// 				errors: errors
// 			});
// 		}

// 		query.where = {
// 			state: req.body.state
// 		}

// 	}

// 	Mission.findAll(query).then(function(result){
// 		var missionList = _.map(result, function(result){
// 			return result.dataValues;
// 		});
// 		res.json({ data: missionList });
// 	});
// }