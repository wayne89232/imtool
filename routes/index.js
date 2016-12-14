
/*
 * GET home page.
 */

exports.index = function(req, res){
	if (!req.session.user)
		var userInfo = "First"
	else
		var userInfo = req.session.user
  	res.render('index', {userInfo: userInfo});
};

exports.partials = function (req, res) {
	// console.log(req.params.name);
	if (!req.session.user)
		var userInfo = "First"
	else
		var userInfo = req.session.user
  	var name = req.params.name;
  	if (!req.session.user)
  		res.render('partials/' + name, {userInfo: userInfo});
  	else
  		res.render('partials/' + name, {userInfo: userInfo});
};