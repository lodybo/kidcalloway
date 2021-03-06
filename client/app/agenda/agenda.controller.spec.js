'use strict';

describe('Testing the Agenda controller', function () {

  // load the controller's module
  beforeEach(module('kidCallowayApp'));

  var AgendaCtrl, scope, httpBackend, timeout, AgendaService, window;
  
  var response = [{"_id":"57029107e9b358540d524ab8","venueName":"Kaffee Lambiek","venueAddress":"Wilhelminapark 66, 5041 ED Tilburg, Netherlands","details":"Kid Calloway speelt samen met Endfield bij Kaffee Lambiek!","fbEvent":"https://www.facebook.com/events/1666492276937175/","ticketLink":"","date":"2016-04-04T16:06:31.000Z","time":"20:00","played":false,"cancelled":false,"__v":0},{"_id":"57029107e9b358540d524ab9","venueName":"Kingsday at the <a href='http://www.bluecollarhotel.nl/'>Blue Collar Hotel</a>","venueAddress":"Klokgebouw 10 Strijp S Eindhoven","details":"Kom met Kid Calloway Koningsdag 2016 vieren in de parkeergarage tegenover het Blue Collar Hotel!","fbEvent":"https://www.facebook.com/events/443752132491052/","ticketLink":"","date":"2016-04-04T16:06:31.000Z","time":"Tussen 14:00 en 16:00","played":false,"cancelled":false,"__v":0},{"_id":"57029107e9b358540d524aba","venueName":"Velvet Music IN STORE","venueAddress":"Torenallee 60-02 unit 8, 5617 BD Eindhoven","details":"28 maart viert Velvet Music Pasen in haar splinternieuwe zaak in de Urban Shopper op Strijp-S en Kid Calloway is erbij, met wel een heel speciaal optreden!","fbEvent":"https://www.facebook.com/events/1740638226152484/","ticketLink":"","date":"2016-04-04T16:06:31.000Z","time":"15:00","played":true,"cancelled":false,"__v":0},{"_id":"57029107e9b358540d524abb","venueName":"Stage Music Cafe","venueAddress":"Stratumseind 25, 5611 EN Eindhoven","details":"Kid Calloway doet mee aan de 3e Rocktocht Eindhoven 2016","fbEvent":"https://www.facebook.com/events/922352567860696/","ticketLink":"","date":"2016-04-04T16:06:31.000Z","time":"16:30","played":true,"cancelled":false,"__v":0},{"_id":"57029107e9b358540d524abc","venueName":"Cafe 't Spektakel","venueAddress":"Prins Bernhardstraat 44, 5721 GC Asten","details":"Kid Calloway viert het weekend in Cafe 't Spektakel","fbEvent":"https://www.facebook.com/events/1678462842424757/","ticketLink":"","date":"2016-04-04T16:06:31.000Z","time":"21:30","played":false,"cancelled":false,"__v":0}];
  
  function encodeUriQuery(val) {
    return encodeURIComponent(val).
        replace(/%40/gi, '@').
        replace(/%3A/gi, ':').
        replace(/%24/g, '$').
        replace(/%2C/gi, ',').
        replace(/%3B/gi, ';').
        replace(/%20/g, '%20').
        replace(/%2B/g, '+'); 
    }

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $timeout, _AgendaService_) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    timeout = $timeout;
    AgendaService = _AgendaService_;

    httpBackend.expect("GET", "/api/settings/rollbarsettings").respond(200, {
        token: "",
        environment: "test"
    });
    httpBackend.flush();
    
    AgendaCtrl = $controller('AgendaCtrl', {
        $scope: scope,
        $window: window 
    });
  }));
  
  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe("Getting a list of agenda items from the service", function () {
    it('should retrieve call the service upon load with a requests for all gigs', function () {
        httpBackend.expectGET("/api/agenda").respond(200, response);
        httpBackend.flush();
    });
    
    
    it("should get a list from the service with all the gigs", function () {
        httpBackend.expectGET("/api/agenda").respond(200, response);
        
        expect(scope.gigs.length).toBe(0);
        
        httpBackend.flush();
        
        expect(scope.gigs.length).toBe(response.length);
    });
    
    it("should fetch the date from the response for orderBy functionality", function () {
        httpBackend.expectGET("/api/agenda").respond(200, response);
        httpBackend.flush();
        
        var date = new Date();
        var dateObj = {
            date: {
                raw: date
            }
        };
        
        var expectation = scope.sortByDate(dateObj);
        expect(expectation.toString()).toEqual(date.toString());
    });

    it('should return a number of the gigs that have not been played yet', function () {
        httpBackend.expectGET("/api/agenda").respond(200, response);
        httpBackend.flush();

        var actualPlayedGigs = 0;
        for (var i=0; i<scope.gigs.length; i++) {
            if (!scope.gigs[i].played) {
                actualPlayedGigs++;
            }
        }

        var controllerFunctionPlayedGigs = scope.getNumberOfPlayedGigs();
        
        expect(controllerFunctionPlayedGigs).toEqual(actualPlayedGigs);
    });
  });
  
  describe("Validating adding a new gig to the list", function () {
      beforeEach(function () {
        // Catch api request
        httpBackend.expectGET("/api/agenda").respond(200, response);
        httpBackend.flush();
        
        // Set form data
        scope.agendaForm = {
            date: {
                $required: true,
                $valid: true
            },
            time: {
                $required: true,
                $valid: true
            },
            venue: {
                $required: true,
                $valid: true
            },
            address: {
                $required: true,
                $valid: true
            },
            fbEvent: {
                $required: false,
                $valid: true
            },
            ticket: {
                $required: false,
                $valid: true
            },
            details: {
                $required: false,
                $valid: true
            }
        };
      });
      
      describe("When asking for field data", function () {
          it("should return the values of the asked field", function() {
              var formVenueString = JSON.stringify(scope.agendaForm.venue);
              var outputVenueString = JSON.stringify(scope.getFieldData("venue"));
              
              expect(formVenueString).toEqual(outputVenueString);
          });
      });
      
      describe("When checking the field input to not be empty", function () {
          it("should return true with a not-empty output", function () {
              var checkResult = scope.isNotEmpty(scope.formData.venue);
              
              expect(checkResult).toBe(true);
          });
          
          it("should return false given an empty input", function () {
              var checkResult = scope.isNotEmpty(scope.formData.details);
              
              expect(checkResult).toBe(false);
          });
          
          it("should return false and not throw an error when the input is undefined", function () {
              var checkResult = scope.isNotEmpty(undefined);
              
              expect(checkResult).toBe(false);
          });
      });
      
      describe("When adding fields to the wrongFields collection", function () {
          it("should add a field", function () {
              expect(scope.errors.wrongFields.length).toBe(0);
              
              scope.addErrorField("venue");
              
              expect(scope.errors.wrongFields.length).toBe(1);
              expect(scope.errors.wrongFields[0]).toBe("venue");
          });
          
          it("should not add a field when it's already present in the wrongFields collection", function () {
              expect(scope.errors.wrongFields.length).toBe(0);
              
              scope.addErrorField("venue");
              
              expect(scope.errors.wrongFields.length).toBe(1);
              expect(scope.errors.wrongFields[0]).toBe("venue");
              
              // Add it again..
              scope.addErrorField("venue");
              
              expect(scope.errors.wrongFields.length).toBe(1);
              expect(scope.errors.wrongFields[0]).toBe("venue");
          });
      });
      
      describe("What the visual toggles should do when validating", function () {
          it("should hide the form and show (and animate) the loader when preparing to send", function () {
              scope.prepareToSend();
              
              expect(scope.showToggles.form).toBe(false);
              expect(scope.loaderScope.visible).toBe(true);
              expect(scope.loaderScope.animate).toBe(true);
          });
          
          it ("should show the form and hide (and stop) the loader when stopping send", function() {
              scope.prepareToSend();
              
              expect(scope.showToggles.form).toBe(false);
              expect(scope.loaderScope.visible).toBe(true);
              expect(scope.loaderScope.animate).toBe(true);
              
              scope.stopPrepareToSend();
              
              expect(scope.showToggles.form).toBe(true);
              expect(scope.loaderScope.visible).toBe(false);
              expect(scope.loaderScope.animate).toBe(false);
          });
          
          describe("Showing a cue based on the status of the stop prepare", function () {
              it("should show the success message when everything is 'fine'", function () {
                  expect(scope.showToggles.success).toBe(false);
                  scope.stopPrepareToSend("success");
                  expect(scope.showToggles.success).toBe(true);
              });
              
              it("should show the error message when something is 'wrong'", function () {
                  expect(scope.showToggles.error).toBe(false);
                  scope.stopPrepareToSend("error");
                  expect(scope.showToggles.error).toBe(true);
              });
          });
      });
      
      describe("Running the validation function", function () {
          beforeEach(function () {
              spyOn(scope, "prepareToSend").and.callThrough();
              spyOn(scope, "stopPrepareToSend").and.callThrough();
          });
          
          it("should end with an error when a required field has not been filled in", function () {
              scope.formData.venue = "";
              
              scope.validate();
              
              expect(scope.prepareToSend).toHaveBeenCalled();
              expect(scope.stopPrepareToSend).toHaveBeenCalledWith("error");
              expect(scope.errors.missingParameters).toBe(true);
              expect(scope.errors.wrongFields[0]).toEqual("venue");
          });
          
          it("should end with an error when a field is not valid", function () {
              scope.agendaForm.venue.$valid = false;
              
              scope.validate();
              
              expect(scope.prepareToSend).toHaveBeenCalled();
              expect(scope.stopPrepareToSend).toHaveBeenCalledWith("error");
              expect(scope.errors.wrongInput).toBe(true);
              expect(scope.errors.wrongFields[0]).toEqual("venue");
          });
          
          describe("Sending correct input to the server", function () {
              xit("should end with a success message when nothing goes wrong at the server's end", function (done) {
                var gigDate = new Date(scope.formData.date);
                
                var uriDa = encodeUriQuery(gigDate.toISOString());
                var uriT = encodeUriQuery(scope.formData.time);
                var uriV = encodeUriQuery(scope.formData.venue);
                var uriA = encodeUriQuery(scope.formData.address);
                var urifb = encodeUriQuery(scope.formData.fbEvent);
                var urit = encodeUriQuery(scope.formData.ticket);
                var uriDe = encodeUriQuery(scope.formData.details);
                httpBackend.expectPOST("/api/agenda/date/" + uriDa + "/time/" + uriT + "/venueName/" + uriV + "/venueAddress/" + uriA + "/fbEvent/" + urifb + "/ticketLink/" + urit + "/details/" + uriDe).respond(200, "success");
                httpBackend.expectGET("/api/agenda").respond(200, response);
                
                spyOn(AgendaService, "addGig").and.callThrough();

                scope.validate();
                scope.$apply();
                
                timeout(function () {
                    // httpBackend.flush();
                    //expect(AgendaService.addGig).toHaveBeenCalled();
                    expect(scope.stopPrepareToSend).toHaveBeenCalledWith("success");
                    expect(scope.showToggles.success).toBe(true);
                    done();
                }, 0);
                timeout.flush();  
              });
          });
          
          describe("Validate using the edit state", function () {
              xit("should validate and call the edit function if an id has been set", function () {
                // Mock data
                scope.formState.state = "edit";
                scope.formData = {
                    id: 123456789,
                    date: new Date(),
                    time: "20:00",
                    venue: "Cafe De Kroeg",
                    address: "Kroegseweg 12, Eindhoven",
                    fbEvent: "http://www.facebook.com/",
                    details: null,
                    ticket: null
                };
                
                // Set spy on $scope.reset()
                spyOn(AgendaService, "editGig").and.callThrough();
                
                httpBackend.expect("POST", "/api/agenda/id/" + scope.formData.id, {
                    date: scope.formData.date,
                    time: scope.formData.time,
                    venue: scope.formData.venue,
                    address: scope.formData.address,
                    fbEvent: scope.formData.fbEvent,
                    ticket: scope.formData.ticket,
                    details: scope.formData.details
                }).respond(201, scope.formData);
                httpBackend.expectGET("/api/agenda").respond(200, response);
                
                scope.validate();
                httpBackend.flush();

                expect(AgendaService.editGig).toHaveBeenCalled();

                timeout(function () {
                    httpBackend.flush();
                    console.log("reset: ", scope.reset.calls);
                    expect(scope.stopPrepareToSend).toHaveBeenCalledWith("success");
                    expect(scope.reset).toHaveBeenCalled();
                    expect(scope.showToggles.success).toBe(true);
                }, 2000);
              });
          });
      });
  });
  
});
