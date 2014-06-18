describe('UsersAccountCtrl', function(){

  var $httpBackend, SERVER_URL, scope;

  beforeEach(module('jobQuery'));

  beforeEach(inject(function($injector){

    var $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');

    $httpBackend = $injector.get('$httpBackend');
    SERVER_URL = $injector.get('SERVER_URL');
    scope = $rootScope.$new();

    createController = function(){
      return $controller('UsersAccountCtrl', {$scope: scope});
    };

  }));

  it('should exist', function(){
    var controller = createController();
    expect(typeof controller).toBe('object');
  });

  it('should make a GET request for user account information', function(){
    $httpBackend.expectGET(SERVER_URL + '/api/public/account').respond({});
    var controller = createController();
    $httpBackend.flush();
  });

  it('should make a PUT request to update user account information', function(){
    $httpBackend.expectGET(SERVER_URL + '/api/public/account').respond({});
    var controller = createController();
    $httpBackend.flush();
    
    $httpBackend.expectPUT(SERVER_URL + '/api/public/account').respond({});
    scope.user = {_id: 1};
    scope.update();
    $httpBackend.flush();
  });

});