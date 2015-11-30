(function() {
  'use strict';

  /**
   * @todo Complete the test
   * This example is not perfect.
   * Test should check if MomentJS have been called
   */
  describe('directive localeSelector', function() {
    // var $window;
    var vm;
    var el;
    var timeInMs;

    beforeEach(module('workshop'));
    beforeEach(inject(function($compile, $rootScope) {
      el = angular.element('<locale-selector></locale-selector>');

      $compile(el)($rootScope.$new());
      $rootScope.$digest();
      vm = el.isolateScope().vm;
    }));

    it('should be compiled', function() {
      expect(el.html()).not.toEqual(null);
    });
  });
})();
