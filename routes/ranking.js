var _ = require('underscore');
var Mission = require('../models').Mission;
var User = require('../models').User;
var Toolship = require('../models').Toolship;
var async = require('async');

//calculate by completed mission's rating
exports.tool_ranking = function(req, res){
	Toolship.findAll({
		//SELECT toolship.user_id, toolship.AVG(rating),  															
		//SELECT COUNT(*) FROM MIssions WHERE  Missions.user_id=Toolship.user_id
		//FROM toolship GROUP BY user_id

		attributes:['user_id',[Toolship.sequelize.fn('AVG', Toolship.sequelize.col('rating')),'rank'],[Toolship.sequelize.fn('COUNT', Toolship.sequelize.col('user_id')), 'number']],
		
		// where:{
		// 	user_id: req.params.user_id
		//},
		// group: 'user_id',

		group: ['user_id'],

		order: [[Toolship.sequelize.fn('AVG', Toolship.sequelize.col('rating')), 'DESC']],

		// include: [User]
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
		    		console.log("UserID: ", data);
		    		resultData.userPhoto = data.photo_url
		    		console.log(resultData)
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

//By the number of mission hosted
exports.function_ranking = function(req, res){
	Toolship.findAll({
		//SELECT toolship.user_id, toolship.AVG(rating) FROM toolship GROUP BY user_id WHERE 
		incude: [{
			model: Mission,
		}]
	}).then(function(result){
		event_list = _.map(result, function(result){
			return result.dataValues;
		});
		res.json({ data: event_list });
	});
}