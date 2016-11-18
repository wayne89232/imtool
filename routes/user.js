var User = require('../models').User;
var Mission = require('../models').Mission;
var Toolship = require('../models').Toolship;
var crypto = require('crypto');

var _ = require('underscore');
var async = require('async');

exports.login = function (req, res){
    // case for sso login: if found login, if not create one

    User.find({
        where: {account: req.body.account}
    }).then(function(user){
        if(user == null){
            res.json({
                success:false,
                msg: "No such user"
            });
        }
        else if(req.body.password!=user.dataValues.password){
            res.json({
                success: false,
                msg: "Wrong password"
            })
        }
        else{
            res.json({
                success: true,
                user: user.dataValues
            });
        }
    });
}

exports.register = function(req, res){
    var query = {
        where:{
            account: req.body.account
        }
    }
    // var new_id = crypto.randomBytes(20).toString('hex');
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
    User.find({ where:{ user_id: req.params.user_id } }).then(function(result){
        res.json({ data: result.dataValues });

    });
}
exports.tooler_mission = function(req, res){
    Mission.findAll({ 
        where:{ user_id: req.params.user_id }
    }).then(function(result){
        res.json({ data: result });
    });
}

exports.tool_mission = function(req, res){
    Toolship.findAll({ 
        where:{ user_id: req.params.user_id },
        include: [Mission] 
    }).then(function(result){
        res.json({ data: result });
    });
}