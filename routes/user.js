var User = require('../models').User;
var Mission = require('../models').Mission;
var Toolship = require('../models').Toolship;
var User_skill = require('../models').User_skill;
var Skill = require('../models').Skill;
var crypto = require('crypto');

var _ = require('underscore');
var async = require('async');

exports.login = function (req, res){
    req.checkBody('account').notEmpty();
    req.checkBody('password').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        return res.status(405).json({
            errors: errors
        });
    }

    var searchId = crypto.createHash('md5').update('imtool' + req.body.account + req.body.password).digest('hex');
    console.log(searchId)

    User.find({
        where: {user_id: searchId}
    }).then(function(user){
        if(user == null){
            res.json({
                success:false,
                msg: "No such user or Wrong password"
            });
        }
        else{
            req.session.user = user.dataValues
            res.json({
                success: true,
                user: user.dataValues
            });
        }
    });
}

exports.logout = function (req, res){
    req.session.user = false;
    res.redirect('/');
}

exports.register = function(req, res){
    console.log(123);
	req.checkBody('account').notEmpty();
	req.checkBody('password').notEmpty();
	req.checkBody('user_name').notEmpty();
	req.checkBody('email').notEmpty().isEmail();
	req.checkBody('gender').notEmpty().isGender();

	var errors = req.validationErrors();
    if (errors) {
		return res.status(405).json({
			errors: errors
		});
	}

    var query = {
        where:{
            account: req.body.account
        }
    }
    User.find(query).then(function(user){
        if(user == null){
            var user = {}
            var newUser = {
                account: req.body.account,
                password: req.body.password,
                user_name: req.body.user_name,
                email: req.body.email,
                gender: req.body.gender
            };

            newUser.user_id = crypto.createHash('md5').update('imtool' + newUser.account + newUser.password).digest('hex');

            User.create(newUser).then(function(user){
                res.json({
                    success: true,
                    user: user.dataValues
                });
            }).error(function(err){
                res.send(err);
            })
        }
        else{
            res.json({
                success: false,
                msg: "Account exists"
            });
        }
    });    
}
exports.user_info = function(req, res){
    User.find({ where:{ user_id: req.params.id } }).then(function(result){
        res.json({ data: result.dataValues });
    }).catch(function(err){
        res.send(err)
    });
}
exports.user_skills = function(req, res){
    User_skill.findAll({ 
        where:{ user_id: req.params.id } , 
        include: [Skill]
    }).then(function(result){
        var skillList = _.map(result, function(result){
            return result.dataValues;
        });
        res.json({ data: skillList });
    }).catch(function(err){
        console.log(err)
        res.send(err)
    });
}
exports.tooler_mission = function(req, res){
    Mission.findAll({ 
        where:{ user_id: req.params.id }
    }).then(function(result){
        var mission_list = _.map(result, function(result){
            return result.dataValues;
        });
        res.json({ data: mission_list });
    }).catch(function(err){
        console.log(err)
        res.send(err)
    });
}

exports.tool_mission = function(req, res){
    Toolship.findAll({ 
        where:{ user_id: req.params.id },
        include: [Mission] 
    }).then(function(result){
        var mission_list = _.map(result, function(result){
            return result.dataValues;
        });
        res.json({ data: mission_list });
    }).catch(function(err){
        console.log(err)
        res.send(err)
    });
}

exports.user_list = function(req, res){
    User.findAll().then(function(result){
        var user_list = _.map(result, function(result){
            return result.dataValues;
        });
        res.json({ data: user_list });
    }).catch(function(err){
        console.log(err)
        res.send(err)
    });
}