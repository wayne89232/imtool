var _ = require('underscore');
var Mission = require('../models').Mission;
var User = require('../models').User;
var Toolship = require('../models').Toolship;
var User_skill = require('../models').User_skill;
var async = require('async');

exports.tool_ranking = function(req, res){
Toolship.findAll({

		attributes:['user_id',[Toolship.sequelize.fn('AVG', Toolship.sequelize.col('rating')),'rank'],[Toolship.sequelize.fn('COUNT', Toolship.sequelize.col('user_id')), 'completedMission']],
		
		group: ['user_id'],

		order: [[Toolship.sequelize.fn('AVG', Toolship.sequelize.col('rating')), 'DESC']],

		where: {
    		rating: {$ne: null}
  		},

	}).then(function(result){

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