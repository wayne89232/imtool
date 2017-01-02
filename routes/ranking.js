var _ = require('underscore');
var Mission = require('../models').Mission;
var User = require('../models').User;
var Toolship = require('../models').Toolship;
var User_skill = require('../models').User_skill;
var Skill = require('../models').Skill;
var async = require('async');

//calculate by completed mission's rating
exports.tool_ranking = function(req, res){

	Toolship.findAll({
		//SELECT toolship.user_id, toolship.AVG(rating),  															
		//SELECT COUNT(*) FROM MIssions WHERE  Missions.user_id=Toolship.user_id
		//FROM toolship GROUP BY user_id

		attributes:['user_id',[Toolship.sequelize.fn('AVG', Toolship.sequelize.col('rating')),'rank'],[Toolship.sequelize.fn('COUNT', Toolship.sequelize.col('user_id')), 'completedMission']],
		
		// where:{
		// 	user_id: req.params.user_id
		//},
		// group: 'user_id',

		group: ['user_id'],

		order: [[Toolship.sequelize.fn('AVG', Toolship.sequelize.col('rating')), 'DESC']],

		where: {
    		rating: {$ne: null}
  		},

		// include: [{
		// 	association: Toolship.belongsTo(User),
  //   		include:  User.hasMany(User_skill) 
		// }]
	}).then(function(result){
		//change order here, group user

		var resultDatas = [];

		async.each(result, function(element, callback) {

		    // Perform operation on file here.
		    var resultData = element.dataValues;

		    User.findOne({
		    	where: {
		    		user_id: resultData.user_id
		    	}
		    }).then(function(response){
		    	if (response){
		    		var data = response.dataValues;
		    		resultData.userPhoto = data.photo_url
		    	}
		    	resultDatas.push(resultData);
		    	callback();
		    }).catch(function(error){
		    	callback(error);
		    })
		}, function(err) {
			// if any of the file processing produced an error, err would equal that error
			 if( err ) {
				// One of the iterations produced an error.
				// All processing will now stop.
				console.log('A file failed to process');
		    } else {
		    	res.json({ data: resultDatas });
			}
		});
	});
}

//By the number of mission hosted
exports.function_ranking = function(req, res){
	Toolship.findAll({
		//SELECT toolship.user_id, toolship.AVG(rating),  															
		//SELECT COUNT(*) FROM MIssions WHERE  Missions.user_id=Toolship.user_id
		//FROM toolship GROUP BY user_id

		attributes:['user_id',[Toolship.sequelize.fn('AVG', Toolship.sequelize.col('rating')),'rank'],[Toolship.sequelize.fn('COUNT', Toolship.sequelize.col('user_id')), 'completedMission']],
		
		// where:{
		// 	user_id: req.params.user_id
		//},
		// group: 'user_id',

		group: ['user_id'],

		order: [[Toolship.sequelize.fn('AVG', Toolship.sequelize.col('rating')), 'DESC']],

		where: {
    		rating: {$ne: null}
  		},

		// include: [User_skill]
	}).then(function(result){
		//change order here, group user

		var resultDatas = [];

		async.each(result, function(element, callback) {

		    // Perform operation on file here.
		    var resultData = element.dataValues;
		    // console.log(resultData);

		    User.findOne({
		    	where: {
		    		user_id: resultData.user_id
		    	},
				include:[{
					model:User_skill, 
					attributes: ['skill_id'],
					include:[{
						model:Skill, 
						attributes: ['skill']
					}]
				}]
		    }).then(function(response){
		    	if (response){
		    		// console.log(response)
		    		var data = response.dataValues;
		    		// console.log("UserID: ", data);
		    		resultData.userPhoto = data.photo_url
		    		resultData.userSkill = _.map(data.User_skills,function(element){
		    			return element.Skill.skill
		    		})
		    		// console.log(resultData)
		    	}
		    	resultDatas.push(resultData);
		    	callback();
		    }).catch(function(error){
		    	callback(error);
		    })
		}, function(err) {
			// if any of the file processing produced an error, err would equal that error
			 if( err ) {
				// One of the iterations produced an error.
				// All processing will now stop.
				console.log('A file failed to process');
		    } else {
		    	console.log('All files have been processed successfully');
		    	console.log("Result: ",resultDatas);
		    	res.json({ data: resultDatas });
			}
		});
	});
}

exports.missionCleared = function(req,res){
	var query = {
		where: {
			state: "Done"
		}
	};
	var resultList = {};

	Mission.findAll(query).then(function(response){
		var doneMissions = _.map(response,function(element){
			return element.dataValues.mission_id
		})
		async.each(doneMissions,function(mission,callback){
			var query = {
				where: {
					mission_id: mission
				}
			}
			Toolship.findAll(query).then(function(response){
				_.each(response,function(element){
					var newTool = element.dataValues.user_id;
					if(resultList[newTool]){
						resultList[newTool] += 1
					}else{
						resultList[newTool] = 1
					}
				})
				callback()
			}).catch(function(err){
				callback(err)
			})
		},function(error){
			if(error)
				res.error(error)
			var userTotal = []
			for (var key in resultList){
				userTotal.push({
					user_id : key,
					count 	: resultList[key]
				})
			}
			var count = 0
			async.each(userTotal,function(user,callback){
				var query = {
					where: {
						user_id: user.user_id
					}
				}
				User.findOne(query).then(function(response){
					userTotal[count].photo_url = response.dataValues.photo_url;
					userTotal[count].account = response.dataValues.account;
					count++
					callback()
				}).catch(function(error){
					callback(error)
				})
			},function(error){
				if (error)
					res.error(error)
				else
					res.json(_.sortBy(userTotal, '-count'))
			})



		})
	})
}

