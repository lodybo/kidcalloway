'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var settingsCtrlStub = {
  index: 'settingsCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var settingsIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './settings.controller': settingsCtrlStub
});

describe('Settings API Router:', function() {

  it('should return an express router instance', function() {
    settingsIndex.should.equal(routerStub);
  });

  describe('GET /api/settingss', function() {

    it('should route to settings.controller.index', function() {
      routerStub.get
        .withArgs('/', 'settingsCtrl.index')
        .should.have.been.calledOnce;
    });

  });

});
