'use strict';

// Test specific configuration
// ===========================

// DB credentials
var user = process.env.MLAB_USER || MLAB_USER;
var pass = process.env.MLAB_PASSWORD || MLAB_PASSWORD;
var db = process.env.MLAB_DATABASE || MLAB_DATABASE;

module.exports = {
  // MongoDB connection options
  mongo: {
    uri: "mongodb://" + user + ":" + pass + "!@ds035046.mlab.com:35046/" + db
  }
};