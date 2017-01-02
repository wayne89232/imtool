var _ = require('underscore');
var Mission = require('../models').Mission;
var User = require('../models').User;
var Toolship = require('../models').Toolship;
var Mission_skill = require('../models').Mission_skill;
var Skill = require('../models').Skill;
var async = require('async');
var Community = require('../models').Community;
var Community_user = require('../models').Community_user;
var Community_chatlog = require('../models').Community_chatlog;

var crypto = require('crypto');

exports.create_community = function(req, res){
	req.checkBody('members').notEmpty();
	req.checkBody('name').notEmpty();
	req.checkBody('description').notEmpty();
	// req.checkBody('location').notEmpty();


	var errors = req.validationErrors();
	if (errors) {
    	return res.status(405).json({
    		errors: errors
		});
	}


	var new_id = crypto.randomBytes(20).toString('hex');
	var newCommunity = {
		community_id: new_id,
		name: req.body.name,
		description: req.body.description,
		photo_url  : req.body.photoURL || '/assets/images/tool.png'
	};

	Community.create(newCommunity).then(function(result){

		var succesMsg = " Success on creating community " + result.dataValues.name;


		//find or create skills
		async.each(req.body.members, function(element, callback) {


		    var new_id2 = crypto.randomBytes(20).toString('hex');
		    Community_user.create({
					community_user_id: new_id2,
					user_id: element.user_id,
					community_id: new_id
		    }).then(function(response){

		    	callback();
		    }).catch(function(error){
		    	callback(error);
		    })
		}, function(err) {
			// if any of the file processing produced an error, err would equal that error
			 if( err ) {
				// One of the iterations produced an error.
				// All processing will now stop.
				console.log('A user failed to join the group');
		    } else {
		    	console.log('All users have been processed successfully');
		    	res.json({ data: "success" });
			}
		});

		// res.json({
		// 	success: true,
		// 	msg: succesMsg
		// });
	}).catch(function(err){
		console.log(err)
		res.send(err);
	});
}

exports.list_community = function(req, res){

		var errors = req.validationErrors();
		if (errors) {
			return res.status(405).json({
				errors: errors
			});
		}


	Community.findAll().then(function(result){
		var comList = _.map(result, function(result){
			return result.dataValues;
		});
		res.json({ data: comList });
	});
}

exports.list_ur_community = function(req, res){
    Community_user.findAll({ 
        where:{ user_id: req.params.id },
    	include: [Community]
    }).then(function(result){
        var community_list = _.map(result, function(result){
            return result.dataValues;
        });
        res.json({ data: community_list });
    }).catch(function(err){
        console.log(err)
        res.send(err)
    });
}


exports.save_community_chat = function(req,res){
    var new_id = crypto.randomBytes(20).toString('hex');
    var new_time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var save_chat = {
        community_chatlog_id: new_id,
        user_id: req.body.user_id,
        community_id: req.body.community_id,
        content: req.body.content,
        time: new_time
    };

    Community_chatlog.create(save_chat).then(function(result){
        res.json({
            msg:"chatlog"
        });
    });
}

exports.get_community_chat = function(req,res){
    Community_chatlog.findAll({
        where: {
            community_id: req.params.id
        },
        include: [User]
    }).then(function(result){
        chat_list = _.map(result, function(result){
            return result.dataValues;
        });
        res.json({ data: chat_list });
    });
}

exports.get_community_member = function(req,res){
    Community_user.findAll({
        where: {
            community_id: req.params.id
        },
        include: [User]
    }).then(function(result){
        user_list = _.map(result, function(result){
            return result.dataValues;
        });
        res.json({ data: user_list });
    });
}

exports.view_community = function(req, res){

	req.checkParams('id').notEmpty();

	var errors = req.validationErrors();
	if (errors) {
		return res.status(405).json({
			errors: errors
		});
	}
	
	Community.find({ 
		where:{ 
			community_id: req.params.id 
		}
	}).then(function(result){
		res.json({ data: result.dataValues });
	}).catch(function(err){
		console.log(err)
		res.send(err);
	});
}
