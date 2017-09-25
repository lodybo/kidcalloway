'use strict';

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: "mongodb://" + process.env.MLAB_USER + ":" + process.env.MLAB_PASSWORD + "!@ds061196.mlab.com:61196/kidcalloway-test",
    options: {
      useMongoClient: true,
      user: process.env.MLAB_USER,
      pass: process.env.MLAB_PASSWORD,
      auth: {
        authdb: "kidcalloway-test"
      }
    }
  }
};