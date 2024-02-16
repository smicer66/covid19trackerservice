var config = require('../config');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var multiparty = require('multiparty');
var http = require('http');
var util = require('util');
var bcrypt = require('bcryptjs');
var gm = require('gm');
var fs = require('fs');
var cloudinary = require('cloudinary');

var knexfile   = require("../config/knexfile");
var knex       = require("knex")(knexfile);
var bookshelf = require('bookshelf')(knex);
const request = require('request');
const User = require('../models/user');
const PushDevice = require('../models/pushdevice');
var passport     = require('passport');
var moment = require('moment');
var slugify = require('slugify');
var socialmedia   = require("../config/social-media");
var underscore = require('underscore');
var handlebars = require('handlebars');
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var cron = require('node-cron');



exports.postCreateNewCustomer = function (req, res, next) {
	var response_data = {};
	console.log(req.body);
	var fields = req.body;
	var field_str = "";
	var mobileNumber = fields.mobile_number;
	
	var rec_mobile = format_mobile(mobileNumber);
			
	if(rec_mobile==null)
	{
		return res.status(200).json({"status": 1, "message": "Invalid mobile number provided. Ensure you provie a valid Zambian mobile number"});
	}
	
	User.where('mobile_number', '=', rec_mobile).get().then(function (usr, error) 
	{
		if (error)
		{
			return res.status(200).json({"status": 1, "message": "Mobile number already registered"});
		}
		
		if(usr)
		{
			return res.status(200).json({"status": 1, "message": "Mobile number already registered"});
		}
		else
		{
			var customer_number = Math.round(Math.random() * (9999999999 - 1000000000) + 1000000000);
			user = new User({
				mobile_number: rec_mobile,
				role_code: 'CUSTOMER',
				uniqueId: customer_number,
			});
			console.log(user);
			user.save().then(function(usr, err) {
				if(err)
				{
					return res.status(200).json({"status": 1, "message": 'New account could not be setup successfully. Please try again'});
				}
				
				if(usr)
				{
					return res.status(200).json({"status": 0, "message": 'New account created successfully. Please try again', 'customer_number': customer_number});
				}
				else
				{
					return res.status(200).json({"status": 1, "message": 'New account could not be setup successfully. Please try again'});
				}
			});
		}
	});
	
	
}



exports.postSpecifyCustomerLocation = function (req, res, next) {
	var response_data = {};
	console.log(req.body);
	var fields = req.body;
	var field_str = "";
	var uniqueId = fields.uniqueId;
	var longitude = fields.longitude;
	var latitude = fields.latitude;
			
	if(latitude==null || longitude==null || latitude==null)
	{
		return res.status(200).json({"status": 1, "message": "Invalid data provided. Ensure data provided is complete"});
	}
	
	User.where('uniqueId', '=', uniqueId).get().then(function (usr, error) 
	{
		if (error)
		{
			return res.status(200).json({"status": 1, "message": "No user matching the id provided"});
		}
		
		if(usr)
		{
			return res.status(200).json({"status": 1, "message": "No user matching the id provided"});
		}
		else
		{
			var usr1 = usr.toJSON();
			customerLocation = new CustomerLocation({
				userId: usr1.id,
				longitude: longitude,
				latitude: latitude,
			});
			console.log(user);
			customerLocation.save().then(function(customerLocation, err) {
				if(err)
				{
					return res.status(200).json({"status": 1, "message": 'Update was not successful'});
				}
				
				if(customerLocation)
				{
					updateData = {};
					updateData = {
						'currentLongitude': longitude,
						'currentLatitude': latitude
					};
					usr.save(updateData).then(userprofile => {
						return res.status(200).json({"status": 0, "message": 'Update was successful'});
					});
				}
				else
				{
					return res.status(200).json({"status": 1, "message": 'Update was not successful'});
				}
			});
		}
	});
	
	
}



function format_mobile(mobile)
{
	var pre = ['096', '094', '095', '097'];
	var subs = mobile.substr(0, 3);
	console.log(subs);
	console.log(pre.indexOf(subs));
	if(mobile.length==10 && pre.indexOf(subs)>-1)
	{
		console.log(mobile.length);
		return ("260" + mobile.substr(1));
	}
	else
	{
		var subs = mobile.substr(0, 4);
		console.log('****************');
		console.log(mobile.length);
		console.log(subs);
		if(subs=='+260' && mobile.length==13)
		{
			console.log('260' + mobile.substr(3));
			return ('260' + mobile.substr(3));
		}
		else if(mobile.substr(0, 3)=='260' && mobile.length==12)
		{
			console.log(mobile);
			return (mobile);
		}
		else
		{
			return null;
		}
	}
}