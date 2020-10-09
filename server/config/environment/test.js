'use strict';

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: "mongodb://" + process.env.MLAB_USER + ":" + process.env.MLAB_PASSWORD + "!@ds061196.mlab.com:61196/kidcalloway-test",
    options: {
      useMongoClient: true,
      auth: {
        user: process.env.MLAB_USER,
        password: process.env.MLAB_PASSWORD,
        authdb: "kidcalloway-test"
      }
    }
  }
};
