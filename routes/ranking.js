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
		attributes:['user_id',[Toolship.sequelize.fn('AVG', Toolship.sequelize.col('rating')),'rank'],[Toolship.sequelize.fn('COUNT', Toolship.sequelize.col('user_id')), 'completedMission']],

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
		    	// console.log("Result: ",resultDatas);
		    	res.json({ data: resultDatas });
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
						console.log(toolship.User.account)
						// if(!_.contains(_.allKeys(user_list),toolship.dataValues.user_id)){
						// 	_.extend(user_list,{[toolship.dataValues.user_id]: {
						// 		count  		: 0,
						// 		avgrating 	: 0,
						// 	}})
						// }

						if (!user_list[toolship.dataValues.user_id]){
							user_list[toolship.dataValues.user_id] = {
								account 	: "",
								imgurl		: "",
								count  		: 0,
								avgrating 	: 0,
							}
						}
						user_list[toolship.dataValues.user_id].account = toolship.dataValues.User.account
						user_list[toolship.dataValues.user_id].imgurl = toolship.dataValues.User.photo_url
						user_list[toolship.dataValues.user_id].avgrating = (user_list[toolship.dataValues.user_id].avgrating * user_list[toolship.dataValues.user_id].count + toolship.dataValues.rating)/ (user_list[toolship.dataValues.user_id].count + 1);
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
