'use strict';

const fs = require('fs');
const path = require('path');

// Load .env configuration.		process.env.KNEX_DEBUG === 'true'
console.log(__dirname);
require('dotenv').load({path: path.resolve(__dirname, './.env')});

module.exports = {
	client: 'mysql',
	connection: {
		host: process.env.MYSQL_HOST || '127.0.0.1',
		port: process.env.MYSQL_PORT || 3306,
		user: process.env.MYSQL_USER || 'root',
		//password: process.env.MYSQL_PASSWORD || 'NC{ad5yh#5qU',
		password: process.env.MYSQL_PASSWORD || '',
		database: process.env.MYSQL_DATABASE || 'covid19tracker',
		charset: 'utf8',
		timezone: 'UTC',
	},
	pool: {
		min: 2,
		max: 200,
	},
	migrations: {
		directory: path.resolve(__dirname, './migrations'),
		tableName: 'migrations',
	},
	debug: true,
};
