
/*
 * GET home page.
 */

exports.index = function(req, res){
  	res.render('index');
};

exports.partials = function (req, res) {
	// console.log(req.params.name);
  	var name = req.params.name;
  	if (!req.session.user)
  		res.render('partials/' + name, {userInfo: req.session.user});
  	else
  		res.render('partials/' + name);
};