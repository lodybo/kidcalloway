'use strict';

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: "mongodb://" + process.env.MLAB_USER + ":" + process.env.MLAB_PASSWORD + "!@ds035046.mlab.com:35046/" + process.env.MLAB_DATABASE
  }
};