'use strict';

const Bookshelf = require('../config/bookshelf.js');


module.exports = Bookshelf.model('PushDevice', {
	tableName: 'push_devices',
	hasTimestamps: ['createdAt', 'updatedAt'],
	hidden: [
		'deletedAt',
	],
	softDelete: true,

  // Format data coming from the database.
	parse: function(response) {
		// NOTE: mysql does not support boolean columns
		// Example: Cast mysql tinyint column to boolean.
		if (response.allowUseOfMyContactInformation != null)
			response.allowUseOfMyContactInformation = !!+response.allowUseOfMyContactInformation;
		return response;
	},
  
	push_user: function() {
		return this.hasOne('User', 'user_id');
	},

});