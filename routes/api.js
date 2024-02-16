var express = require('express');
var router = express.Router();
var ApiController = require('../controllers/api.controller');
var Authorization = require('../auth/authorization');
var Guest = require('../auth/guest');

/* GET home page. */
//router.get('/api/get-skillset-services/:skillset-id', ApiController.getServiceBySkillSetId);

module.exports = router;
