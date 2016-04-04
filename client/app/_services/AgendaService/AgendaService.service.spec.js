'use strict';

describe('Service: AgendaService', function () {

  // load the service's module
  beforeEach(module('kidCallowayApp'));

  // instantiate service
  var AgendaService;
  beforeEach(inject(function (_AgendaService_) {
    AgendaService = _AgendaService_;
  }));

  it('should do something', function () {
    expect(!!AgendaService).toBe(true);
  });

});
