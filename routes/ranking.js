var _ = require('underscore');
var Mission = require('../models').Mission;
var Mission_skill = require('../models').Mission_skill;
var User = require('../models').User;
var Toolship = require('../models').Toolship;
var User_skill = require('../models').User_skill;
var Skill = require('../models').Skill;
var async = require('async');

//calculate by completed mission's rating


//By the number of mission hosted
exports.tool_ranking = function(req, res){
	Toolship.findAll({
		attributes:['user_id',[Toolship.sequelize.fn('AVG', Toolship.sequelize.col('rating')),'ranking'],[Toolship.sequelize.fn('COUNT', Toolship.sequelize.col('user_id')), 'completedMission']],

		group: ['user_id'],

		order: [[Toolship.sequelize.fn('AVG', Toolship.sequelize.col('rating')), 'DESC']],

		where: {
    		rating: {$ne: null}
  		},

		// include: [User_skill]
	}).then(function(result){
		//change order here, group user
		var resultDatas = [];
		var skill_list= [];
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
		    		resultData.photo_url = data.photo_url
		    		resultData.account   = data.account 
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
		    	var orderResultDatas = _.sortBy(resultDatas,"-rank")
		    	// console.log("Result: ",resultDatas);
		    	res.json({ data: orderResultDatas });
			}
		});
	});
}


exports.function_ranking = function(req, res){
	Skill.findAll({
		attributes:['skill'],
		// group:['skill_id'],
		include:[{
			model: Mission_skill,
			attributes: ['mission_id'],
			include:[{
				model:Mission,
				attributes: ['mission_id'],
				include:[{
					model:Toolship,
					attributes:['user_id','rating'],
					include:[{
						model:User,
						attributes:['account','photo_url']
					}]
				}]
			}]
		}]
	}).then(function(result){
		var type_list = _.map(result, function(skill){
			var obj = {};
			var user_list={};
			// console.log(result)
			// console.log(skill.dataValues)
			obj.Skill = skill.skill

			_.map(skill.Mission_skills,function(mission){
				
				var toolships = mission.dataValues.Mission.dataValues.Toolships
				if(toolships){
 					_.map(toolships,function(toolship){
						// console.log(skill.skill)
						// console.log(toolship.User.account)
						// if(!_.contains(_.allKeys(user_list),toolship.dataValues.user_id)){
						// 	_.extend(user_list,{[toolship.dataValues.user_id]: {
						// 		count  		: 0,
						// 		avgrating 	: 0,
						// 	}})
						// }

						if (!user_list[toolship.dataValues.user_id]){
							user_list[toolship.dataValues.user_id] = {
								account 	: "",
								photo_url	: "",
								count  		: 0,
								ranking 	: 0,
							}
						}
						user_list[toolship.dataValues.user_id].account = toolship.dataValues.User.account
						user_list[toolship.dataValues.user_id].photo_url = toolship.dataValues.User.photo_url
						user_list[toolship.dataValues.user_id].ranking = (user_list[toolship.dataValues.user_id].ranking * user_list[toolship.dataValues.user_id].count + toolship.dataValues.rating)/ (user_list[toolship.dataValues.user_id].count + 1);
						user_list[toolship.dataValues.user_id].count++
					})	
						

				}

				
			})

			obj.user = user_list;
			// console.log(obj)
			return obj
		})
        // var type_list = _.map(result, function(result){
        //     return result.dataValues;
        // });
        res.json({ data: type_list });
    }).catch(function(err){
        console.log(err)
        res.send(err)
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

