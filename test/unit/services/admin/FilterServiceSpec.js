'use strict';

describe('Unit: FilterService', function(){
  // Load the module with MainController
  beforeEach(module('jobQuery'));

  var FilterService;

  beforeEach(inject(function($injector) {
    FilterService = $injector.get('FilterService');
  }));

  describe('FilterService methods', function(){

    it('should have a download method', function(){
      expect(FilterService.download).toBeDefined();
      expect(typeof FilterService.download).toBe('function');
    });

  });

});
