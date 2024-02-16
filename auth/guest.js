var config = require('../config');

var guest = function (req, res, next) {
    /*var token = req.headers['x-access-token'];
    var msg = {};
    if (token) 
	{
		jwt.verify(token, config.SECRET, function (err, decoded) {
			var msg = {auth: false, message: 'Failed to authenticate token.'};
			if (err)
			{
				next();
			}
			res.status(500).send(msg);
			next();
		});
	}
	next();*/
	if (req.session.user)
	{
		res.redirect('/');
	}
	else
	{
		return next();
	}
}

module.exports = guest;