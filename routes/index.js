var express = require('express');
var router = express.Router();
const {check} = require('express-validator/check');
var {validationResult} = require('express-validator/check');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var HomeController = require('../controllers/home.controller');
var Authorization = require('../auth/authorization');
var AuthorizationForAdmin = require('../auth/authorizationforadmin');
//var AuthorizationForBucketer = require('../auth/authorizationforbucketer');
//var AuthorizationForFiller = require('../auth/authorizationforfiller');
var Guest = require('../auth/guest');

/* GET home page. */

module.exports = function (app) {
	app.post('/api/create-new-customer', HomeController.postCreateNewCustomer);
}
//module.exports = router;
