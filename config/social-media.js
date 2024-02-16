'use strict';

const fs = require('fs');
const path = require('path');

// Load .env configuration.		process.env.KNEX_DEBUG === 'true'
console.log(__dirname);

module.exports = {
	facebook_config: {
		clientID: '875380709211800',
		clientSecret: 'b8862b9c36d70d43e7e11e059624e3c4',
		callbackURL: 'http://45.76.81.165:443/auth/facebook/callback',
	},
	google_config: {
		//GOOGLE_CONSUMER_KEY: '745043048669-cluh4neul7jvd7vvui3f4dufc15p4p8g.apps.googleusercontent.com',
		GOOGLE_CONSUMER_KEY: '745043048669-cluh4neul7jvd7vvui3f4dufc15p4p8g.apps.googleusercontent.com',
		GOOGLE_CONSUMER_SECRET: 'A4jAOUO9DMFmN75n-uPaAhYA',
		GOOGLE_CALLBACK_URL: 'http://45.76.81.165:443/auth/google/callback',
	},
	twitter_config: {
		//GOOGLE_CONSUMER_KEY: '745043048669-cluh4neul7jvd7vvui3f4dufc15p4p8g.apps.googleusercontent.com',
		TWITTER_CONSUMER_KEY: 'ZO8lxKY84h9QpNpO6eAbAF5oK',
		TWITTER_CONSUMER_SECRET: 'DrZPdqCymU2zHWa5PdcwN5VnmY5T3h9tU6LpDf6LSq1wPnFlsM',
		TWITTER_CALLBACK_URL: 'http://45.76.81.165:443/auth/twitter/callback',
	},
	web_push: {
		PUBLIC_KEY: 'BMzvnxjApQg0SGhaC-2MDnjeZ91HhyRd2zrRgpjJ9mRYYxGdQeKnyKhjtCr4W9YcQDG_ezcb0HULbIT-kphn90k',
		PRIVATE_KEY: 'y85ulTyA7U1IZgKyoHb-S6AkXGTMWkYEPFkWdYcFL1E',
		ONE_SIGNAL_APP_ID: 'e1cb8669-3d77-4975-a26c-bbb003e0bec0',
		ONE_SIGNAL_API_KEY: 'NzRmM2VmNDAtM2YzMy00ZmYwLTk0OGEtYWY4OGQ5OTRmYmE0'
	},
	mailgun: {
		API_KEY: 'key-d2ae63cf4e7f4e08b04b4ac4e37e10df',
		DOMAIN: 'mails.shikola.com',
		//MAIL_SENDER: 'mailer@shikola.com',
		MAIL_SENDER: 'mailer@bookabucket.com',
		MAIL_SENDER_NAME: 'Book-A-Bucket'
	},
	sms: {
		USERNAME: 'shawndidy',
		PASSWORD: '@Madagascar711'
	},
	paystack: {
		SECRET_KEY_SHAUN_LIVE: 'sk_live_6f6d2a42f2a30fa09f4a353f65a7b226be179826',
		PUBLIC_KEY_SHAUN_LIVE: 'pk_live_a6ade3bda3457ce175bcb5193b623f7fc9d935c5',
		SECRET_KEY_KACHI: 'sk_test_a205ed6cc6e2ae9d5ad113c6df5bfa644b0bbd64',
		PUBLIC_KEY_KACHI: 'pk_test_93b21949dd3da62adf8f0b9d5f3894b4747e88a4',
		SECRET_KEY: 'sk_test_88fab7b50325a090db41772505aa57ac8795c802',
		PUBLIC_KEY: 'pk_test_e87d079dbc61c4a514d7a03ea852706ee143f659',
		BVN_VERIFICATION_CHARGE: 52.00,
		BVN_VERIFICATION_SERVICE_CHARGE: 0.00,
		BVN_VERIFICATION_TAX_CHARGE: 0.00,
	},
	google: {
		GOOGLE_KACHI_KEY: 'AIzaSyAgeuuDfRlweIs7D6uo4wdIHVvJ0LonQ6g',
		GOOGLE_SHAUN_KEY: 'AIzaSyAOzKc6mp72g-ikzPDP6gtT3JugOuBzeuQ'
	},
	infobip: {
		USERNAME: 'BOOKA-BUCKET',
		PASSWORD: '@Kilimanjaro711'
	},
	cloudinary: {
		cloud_name: 'bookabucket-com',
		api_key: '695614851818598',
		api_secret: 'GQXZUxcKwBCJziJ5HJWeiqoafrI'
	}
};