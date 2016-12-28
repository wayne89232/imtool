// import models: 
// var Example = require('../models').Example;
var _ = require('underscore');
var Mission = require('../models').Mission;
var User = require('../models').User;
var Toolship = require('../models').Toolship;

var crypto = require('crypto');

/**
 * @api {post} /createToolship/
 * @apiParam {String} [username]  Account of users
 * @apiParam {String} title     Name of the Toolship
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      	success: true,
 *      	msg: succesMsg
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 405 
 *     {
 *  		"errors": [
 *    		{
 *      		"param": "username",
 *      		"msg": "Invalid value"
 *    		},
 *    		{
 *      		"param": "title",
 *      		"msg": "Invalid value"
 *    		}
 *  			]
 *		}
 */
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

/**
 *@api {get} /myToolship/:username
 *@apiExample {js} Example usage:
 *     http://localhost/myToolship/:username
 * @apiName my_toolship
 * @apiParam {String} [username]  Account of users
 *@apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "title": toolshipList
 *     }
 */

exports.my_toolship = function(req, res){

	//req.checkBody('username').notEmpty(); //member in this toolship
	//req.checkBody('title').notEmpty(); //name of toolship
	req.checkParams('username').notEmpty();

	var member_id;

	var query = {
		attributes:['user_id']
	}
	query.where = {
		account: req.params.username
	}
	User.findAll(query).then(function(result){
		member_id = _.map(result, function(result){
			return result.dataValues;
		});
		var queryToolship = {
			attributes:['title']
		}
		queryToolship.where = {
			user_id:　member_id[0].user_id
		}

		Toolship.findAll(queryToolship).then(function(result){
			var toolshipList = _.map(result, function(result){
				return result.dataValues;
			});
			res.json({ title: toolshipList });
		}).catch(function(err){
			res.send(err);
		});
	});
	
}

/**
 *@api {get} /getToolship/
 *@apiExample {js} Example usage:
 *     http://localhost/getToolship/
 * @apiName list_toolship
 *@apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": toolshipList
 *     }
 */
exports.list_toolship = function(req, res){
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
/**
 *@api {get} /getMembers/:title
 *@apiExample {js} Example usage:
 *     http://localhost/myToolship/:title
 *@apiName getMembers
 *@apiParam {String} [title]  The name of the toolship
 *@apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "members": accountList
 *     }
 */
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
		//get account name by user_id
			var queryMember = {
				attributes: ['user_name']
			}
			queryMember.where = {
				user_id: memberList[0].user_id
			}

			User.findAll(queryMember).then(function(result){
				//res.send(result);
				var accountList = _.map(result, function(result){
						return result.dataValues;
					});
				res.json({members: accountList});
				// res.json({members: accountList});
			});
			//res.json({user_id: memberList});
	});	
}
