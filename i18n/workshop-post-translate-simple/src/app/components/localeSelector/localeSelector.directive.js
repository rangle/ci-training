(function() {
  'use strict';

  angular
    .module('workshop')
    .directive('localeSelector', localeSelector);

  /** @ngInject */
  function localeSelector() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/localeSelector/localeSelector.html',
      scope: {
          creationDate: '='
      },
      controller: LocaleSelectorController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function LocaleSelectorController($translate) {
      var vm = this;

      vm.current = $translate.use();
      vm.change = $translate.use.bind($translate);
    }
  }

})();
