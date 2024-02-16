var express = require('express');
var router = express.Router();
const {check} = require('express-validator/check');
var {validationResult} = require('express-validator/check');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var UtilityController = require('../controllers/utility.controller');
var ApiController = require('../controllers/api.controller');
var Authorization = require('../auth/authorization');
var Guest = require('../auth/guest');

/* GET home page. */

module.exports = function (app) {
	app.get('/utility/get_current_balance/:amount_to_pay', UtilityController.getCurrentBalance);
	app.get('/utility/validate-skillset-per-location/:skillsetservice_id/:state_id', UtilityController.getValidateSkillsetPerLocation);
	app.get('/utility/send-sms/:mobile/:type_code', UtilityController.sendSms);
	app.get('/utility/send-new-user-sms/:mobile/:type_code/:user_code?', UtilityController.sendNewUserSms);
	app.get('/utility/resend-new-user-sms/:mobile/:type_code/:user_code?', UtilityController.resendNewUserSms);
	app.get('/utility/authenticate-otp/:mobile/:otp/:check_user?', UtilityController.authenticateOtp);
	app.get('/utility/authenticate-email-otp/:email/:otp', UtilityController.authenticateEmailOtp);
	app.get('/utility/get-category-search/:search', UtilityController.getCategorySearch);
	app.get('/utility/get-all-category-search', UtilityController.getAllCategoryForSearch);
	app.get('/utility/get-cleaning-pricing-per-room/:bedrooms/:bathrooms/:restrooms/:kitchens/:cleaningtype/:buildingtype/:usercode?', UtilityController.getCleaningPricingPerRoom);
	app.get('/utility/get-task-service-charge/:user_type/:task_amount', UtilityController.getTaskServiceCharge);
	//app.get('/utility/get-cleaning-task-service-charge/:user_type/:task_amount/:task_id', UtilityController.getCleaningTaskServiceCharge);
	app.get('/utility/get-fee-breakdown/:bucketerbidoffer', UtilityController.getFeeBreakdown);
	app.get('/utility/validate-user/:user_email/:user_code?', UtilityController.validateUserByEmail);
	app.get('/utility/save-task-bookmark/:task_id?/:user_id?', UtilityController.getSaveTaskBookmark);
	app.get('/utility/save-bucketer-bookmark/:bucketer_id?/:user_id?', UtilityController.getSaveBucketerBookmark);
	app.get('/js/auto/*.js', UtilityController.getAccessoryFile);
	app.get('/js/datepicker/*.js', UtilityController.getAccessoryFile);
	app.get('/js/timepicker/*.js', UtilityController.getAccessoryFile);
	app.get('/js/datepicker/locales/*.js', UtilityController.getAccessoryFile);
	app.get('/js/timepicker/locales/*.js', UtilityController.getAccessoryFile);
	app.get('/css/*.js', UtilityController.getAccessoryFile);
	app.get('/images/*.*', UtilityController.getAccessoryFile);
	app.get('*', UtilityController.getPageNoExist);
}
//module.exports = router;
