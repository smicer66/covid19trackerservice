'use strict';

const Bookshelf = require('../config/bookshelf.js');
require('./task');


function validPassword(password, password2) {
    return bcrypt.compareSync(password, password2);
}

module.exports = Bookshelf.model('User', {
  tableName: 'users',
  hasTimestamps: ['createdAt', 'updatedAt'],
  hidden: [
    'password',
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