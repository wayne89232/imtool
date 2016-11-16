var _ = require('underscore');
var Mission = require('../models').Mission;
var User = require('../models').User;



//calculate?
exports.toolest = function(req, res){
	Toolship.findAll({
		incude
	}).then(function(result){
		event_list = _.map(result, function(result){
			return result.dataValues;
		});
		res.json({ data: event_list });
	});
}