var User = require('../models').User;
var Mission = require('../models').Mission;
var Toolship = require('../models').Toolship;
var User_skill = require('../models').User_skill;
var Skill = require('../models').Skill;
var sendMail = require('../scripts/sendmail');
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

exports.updateUser = function(req,res){

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

    var newUserData = _.omit(req.body, ["createdAt","updatedAt"]);
    var query = {
        where:{
            account: req.body.account
        }
    }

    User.update(newUserData,query).then(function(response){
        console.log(response)
        res.json({data: "OK"});
    })

}


exports.logout = function (req, res){
    req.session.user = false;
    res.redirect('/');
}

exports.sendVerMail = function(req,res){
    req.checkBody('email').notEmpty().isEmail();
    var errors = req.validationErrors();
    if (errors) {
        return res.status(405).json({
            errors: errors
        });
    }
    sendMail(req.body.email).then(function(verStr){
        res.status(200).json({msg: "mail send", verStr: verStr});
    })
}

exports.register = function(req, res){
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

    console.log("Skills: ", req.body.skills)

    var query = {
        where:{
            account: req.body.account
        }
    }
    User.find(query).then(function(user){
        if(user == null){
            var user = {}
            var newUser = {
                account    : req.body.account,
                password   : req.body.password,
                user_name  : req.body.user_name,
                email      : req.body.email,
                gender     : req.body.gender,
                photo_url  : req.body.photoURL || '/assets/images/tool.png'
            };

            newUser.user_id = crypto.createHash('md5').update('imtool' + newUser.account + newUser.password).digest('hex');

            User.create(newUser).then(function(user){


                async.each(req.body.skills, function(element, callback) {
                    console.log(element)


                    var new_id2 = crypto.randomBytes(20).toString('hex');
                    Skill.findOrCreate({
                        where: {
                            skill: element
                        },
                        defaults: { // set the default properties if it doesn't exist
                            skill_id: new_id2,
                            skill: element
                        }
                    }).then(function(response){
                        var link_skill = response[0].dataValues;
                        // create relations here
                        var new_id3 = crypto.randomBytes(20).toString('hex');
                        User_skill.create({
                            user_skill_id: new_id3,
                            skill_id: link_skill.skill_id,
                            user_id: newUser.user_id
                        }).then(function(result){
                            console.log("linked skill " + link_skill.skill)
                        }).catch(function(error){
                            callback(error)
                        });             


                        callback();
                    }).catch(function(error){
                        callback(error);
                    })
                }, function(err) {
                    // if any of the file processing produced an error, err would equal that error
                     if( err ) {
                        // One of the iterations produced an error.
                        // All processing will now stop.
                        console.log(err)
                        console.log('A skill failed to find on create');
                    } else {
                        console.log('All skill have been processed successfully');
                        res.json({
                            success: true,
                            user: user.dataValues
                        });
                    }
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