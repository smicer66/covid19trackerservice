'use strict';

const Bookshelf = require('../config/bookshelf.js');


module.exports = Bookshelf.model('ErrorLog', {
  tableName: 'error_logs',
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

});