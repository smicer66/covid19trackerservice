var jwt = require('jsonwebtoken');
var config = require('../config');
const {validationResult} = require('express-validator/check');
var DataService = require('../services/data.services');

_this = this;



exports.loadHome = async function (req, res, next) {

    // Req.Body contains the form submit values.
    try {
		return res.status(200).json({data: data, status: 1, message: "You are fine"});
    } catch (e) {
		console.log(e);
		console.err(e);
        return res.status(400).json({status: 400, message: "You are not fine"})
    }
}


exports.postCreateNewCustomer = async function (req, res, next) {
	try {
		var data = await DataService.postCreateNewCustomer(req, res, next);
    } catch (e) {
		console.log(e);
		console.err(e);
        return res.status(400).json({status: 400, message: "General system error experienced"})
    }
}

