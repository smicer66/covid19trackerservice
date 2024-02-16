var jwt = require('jsonwebtoken');
var config = require('../config');

var authorizationforbucketer = function (req, res, next) {
    /*var token = req.headers['x-access-token'];
    var msg = {auth: false, message: 'No token provided.'};
    if (!token) 
	{
		res.status(500).send(msg);
	}
    jwt.verify(token, config.SECRET, function (err, decoded) {
        var msg = {auth: false, message: 'Failed to authenticate token.'};
        if (err) 
		{
			res.status(500).send(msg);
		}
        next();
    });*/
	if (req.session.user && req.session.user.role_code=='BUCKETER')
      return next();

  
	req.flash('flashMessageInfo', 'Sign in with your bucketer account to continue');
	if(req.method=='GET')
		res.redirect('/?login=1&redirect=' + req.url);
	else
		res.redirect('/?login=1');
}

module.exports = authorizationforbucketer;