/**
 * Error responses
 */

'use strict';

var rollbar = require("rollbar");

module.exports[404] = function pageNotFound(req, res) {
  var viewFilePath = '404';
  var statusCode = 404;
  var result = {
    status: statusCode
  };

  res.status(result.status);
  res.render(viewFilePath, function (err) {
    if (err) {
      rollbar.handleError(err, req);
      return res.json(result, result.status);
    }

    rollbar.reportMessageWithPayloadData("404 error detected by Express", {
      level: "warning",
      express: {
        request: req,
        response: res
      }
    });
    
    res.render(viewFilePath);
  });
};
