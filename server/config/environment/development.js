'use strict';

// Development specific configuration
// ==================================
var user, pass, db;

/* jshint ignore:start */
user = process.env.MLAB_USER ? process.env.MLAB_USER : ${MLAB_USER };
pass = process.env.MLAB_USER ? process.env.MLAB_USER : ${MLAB_USER };
db = process.env.MLAB_USER ? process.env.MLAB_USER : ${MLAB_USER };
/* jshint ignore:end */

module.exports = {
  // MongoDB connection options
  mongo: {
    uri: "mongodb://" + user + ":" + pass + "!@ds035046.mlab.com:35046/" + db
  },

  seedDB: false
};
