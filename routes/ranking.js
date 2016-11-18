var _ = require('underscore');
var Mission = require('../models').Mission;
var User = require('../models').User;



//calculate by completed mission's rating
exports.tool_ranking = function(req, res){
	Toolship.findAll({
		incude: [{
			model: Mission,
			through: {
				where: {status: "Done"}
			}
		}]
	}).then(function(result){
		//change order here, group user
		event_list = _.map(result, function(result){
			return result.dataValues;
		});
		res.json({ data: event_list });
	});
}

//By the number of mission hosted
exports.user_ranking = function(req, res){
	Toolship.findAll({
		incude
	}).then(function(result){
		event_list = _.map(result, function(result){
			return result.dataValues;
		});
		res.json({ data: event_list });
	});
}