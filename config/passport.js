// config/passport.js

// load all the things we need
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

// load up the user model
var User  = require('../models/user');
var bcrypt = require('bcryptjs');
var socialmedia   = require("../config/social-media");
var slugify = require('slugify');

// expose this function to our app using module.exports
var myLocalConfig = (passport) => {
    
	
	passport.serializeUser(function(user, done) {
		console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
		console.log('||||||||||||||||||||||||||||||||||||||');
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
	
	passport.use('local-login', new LocalStrategy(
		{
		usernameField : 'emailaddress',
		passwordField : 'password',
		passReqToCallback : true
		}, function(req, emailaddress, password, done) 
		{
			console.log(emailaddress);
			console.log(password);
			
			/*User.findOne({
				username: 'smicer66@gmail.com'
			}*/
			
			
			var user = User.where('username', emailaddress).with('bucketer_skillset_service_list').first().then(function(user, err)
			{
				console.log(err);
				if (err) {
					consol.log(err);
					return done(err);
				}
				
				
				if (!user) {
					return done(null, false);
				}
				console.log(user.get('id'));
				
				if(user)
				{
					var comp = bcrypt.compareSync(password, user.get('password'));
					/*, function(err, res) {
						console.log('**********');
						console.log(err);*/
					//console.log(comp);
					//console.log("AAAAAAAAAAAAA");
					x = user;
					if(comp==false) {
						console.log("BBBBBBBBBBBB");
						return done(null, false);
						//x = false
					}
					console.log(user.get('password'));
					
					console.log(user.toJSON());
					
					if(user.toJSON().status=='Inactive' && user.toJSON().confirmation_code)
					{
						return done({confirmation_code:false, error: null}, false);
					}
					
					
					if(user.toJSON().blacklist!=null && user.toJSON().blacklist==1)
					{
						return done({blacklist:true, error: null}, false);
					}
					else
					{
						req.session.user = user;
						return done(null, user);
					}
				}
				else{
					return done(null, false);
				}
			});
			//function(err, user) {
			
			/*}).then(x => {
				
				console.log("x");			
				console.log(x);
				return x;
			});*/
				
				
			//});
		}
		
	));
	
	
	passport.use('facebook-login', new FacebookStrategy(
	{
		clientID : socialmedia.facebook_config.clientID,
		clientSecret : socialmedia.facebook_config.clientSecret,
		callbackURL : socialmedia.facebook_config.callbackURL,
		profileFields: ['id', 'displayName', 'photos', 'email', 'gender']
	}, function (token, refreshToken, profile, done)
		{
			if(profile)
			{
				console.log(profile._json.picture);
				console.log(profile);
				console.log(JSON.stringify(profile));
				var emailaddress = profile._json.email;
				var name = profile._json.name;
				var gender = profile._json.gender;
				var photo = profile._json.picture.data.url;
				User.where('username', emailaddress).with('bucketer_skillset_service_list').first().then(function(user, err)
				{
					if (err) {
						return done(err);
					}
					
					
					if (!user) {
						var user_code = Math.round(Math.random() * (99999999 - 10000000) + 10000000);
						var user = new User({
							first_name: name.split(' ')[0],
							last_name: name.split(' ')[1],
							username: emailaddress,
							online_status: 0,
							user_url: slugify(name.toLowerCase() + ' ' + user_code),
							user_code: user_code,
							is_verified: 0,
							gender: gender,
							changed_password: 1,
							role_code: 'CUSTOMER',
							email_address: emailaddress,
							status: 'Active',
							social_media_img_url: photo,
							signup_mode: 'FB'
						});
						
						user.save().then(usr => {
							
							User.where('id', usr.toJSON().id).with('bucketer_skillset_service_list').first().then(function(usr, err)
							{
								if (err) {
									return done(err);
								}
								
								if(usr)
								{
									return done(null, usr);
								}
								else
								{
									return done(null, false);
								}
							});
							
						}).catch(function(err){
							return done(null, false);
						});
						
					}
					else
					{
						user.save({
							social_media_img_url: photo
						}, {
							method: 'update',
							patch: true
						}).then(user => {
							User.where('id', user.toJSON().id).with('bucketer_skillset_service_list').first().then(function(usr, err)
							{
								if (err) {
									return done(err);
								}
								
								if(usr)
								{
									return done(null, usr);
								}
								else
								{
									return done(null, false);
								}
							});
						});
					}
				});
			}
			else
			{
				return done(null, false);
			}
		}
		
	));

	
	passport.use('google-login', new GoogleStrategy(
		{
			consumerKey: socialmedia.google_config.GOOGLE_CONSUMER_KEY,
			consumerSecret: socialmedia.google_config.GOOGLE_CONSUMER_SECRET,
			callbackURL: socialmedia.google_config.GOOGLE_CALLBACK_URL
		},
		function(token, tokenSecret, profile, done) 
		{
			console.log(profile);
		}
	));



	passport.use('twitter-login', new TwitterStrategy({
			consumerKey: socialmedia.twitter_config.TWITTER_CONSUMER_KEY,
			consumerSecret: socialmedia.twitter_config.TWITTER_CONSUMER_SECRET,
			callbackURL: socialmedia.twitter_config.TWITTER_CALLBACK_URL
		},
		function(token, tokenSecret, profile, done) 
		{
			console.log(profile);
			console.log(token);
			if(profile)
			{
				console.log(profile._json.profile_image_url);
				//console.log(profile);
				//console.log(JSON.stringify(profile));
				var screen_name = profile._json.screen_name;
				var name = profile._json.name;
				var names = name.split(' ');
				var photo = profile._json.profile_image_url;
				User.where('username', screen_name).with('bucketer_skillset_service_list').first().then(function(user, err)
				{
					console.log(1);
					if (err) {
						console.log(2);
						return done(err);
					}
					
					console.log(3);
					if (!user) {
						console.log(4);
						var user_code = Math.round(Math.random() * (99999999 - 10000000) + 10000000);
						var user = new User({
							first_name: names[0],
							last_name: names.length > 0 ? names[1] : '',
							username: screen_name,
							online_status: 0,
							user_url: slugify(name.toLowerCase() + ' ' + user_code),
							user_code: user_code,
							is_verified: 0,
							//gender: gender,
							changed_password: 1,
							role_code: 'CUSTOMER',
							email_address: screen_name,
							status: 'Active',
							social_media_img_url: photo,
							signup_mode: 'FB'
						});
						console.log(5);
						
						user.save().then(usr => {
							console.log(6);
							User.where('id', usr.toJSON().id).with('bucketer_skillset_service_list').first().then(function(usr, err)
							{
								console.log(7);
								if (err) {
									console.log(8);
									return done(err);
								}
								console.log(9);
								
								if(usr)
								{
									console.log(10);
									return done(null, usr);
								}
								else
								{
									console.log(11);
									return done(null, false);
								}
								console.log(12);
							});
							console.log(13);
						}).catch(function(err){
							console.log(14);
							console.log(err);
							return done(null, false);
						});
						console.log(15);
					}
					else
					{
						console.log(16);
						user.save({
							social_media_img_url: photo
						}, {
							method: 'update',
							patch: true
						}).then(user => {
							console.log(17);
							User.where('id', user.toJSON().id).with('bucketer_skillset_service_list').first().then(function(usr, err)
							{
								console.log(18);
								if (err) {
									console.log(19);
									return done(err);
								}
								
								if(usr)
								{
									console.log(20);
									return done(null, usr);
								}
								else
								{
									console.log(21);
									return done(null, false);
								}
							});
							console.log(22);
						});
						console.log(23);
					}
					console.log(24);
				});
				console.log(25);
			}
			else
			{
				console.log(26);
				return done(null, false);
			}
			console.log(1);
		}
	));
};

module.exports = myLocalConfig;