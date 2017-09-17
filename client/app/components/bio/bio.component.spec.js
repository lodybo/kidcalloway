describe('The Bio Component', function() {
  var compile, scope;

  beforeEach(inject(function ($compile, $rootScope) {
    compile = $compile;
    scope = $rootScope.$new();
  }));

  it('should not show them if the size has not been set', function() {
    var element = angular.element('<bio></bio>');
    var compiledElement = compile(element)(scope)[0];

    var band = compiledElement.querySelector('.band');
    expect(band).toBeNull();
  });

  it('should not show them if the size is set to "small"', function() {
    var element = angular.element('<bio size="small"></bio>');
    var compiledElement = compile(element)(scope)[0];

    var band = compiledElement.querySelector('.band');
    expect(band).toBeNull();
  });

  it('should show them if the size is set to "large"', function() {
    var element = angular.element('<bio size="large"></bio>');
    var compiledElement = compile(element)(scope)[0];

    var band = compiledElement.querySelector('.band');
    expect(band).toBeDefined();
  });
});