(function() {
  'use strict';

  angular
    .module('workshop')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, moment) {

    $log.debug('runBlock end');

    $rootScope.$on('$translateChangeStart', function (event, lang) {
      moment.locale(lang);
    });
  }

})();
