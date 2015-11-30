(function() {
  'use strict';

  angular
    .module('workshop')
    .config(config)
    .config(translations);

  /** @ngInject */
  function config($logProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

  function translations($translateProvider) {
    $translateProvider.useSanitizeValueStrategy('escape');

    $translateProvider.useStaticFilesLoader({
      prefix: 'assets/locales/locale-',
      suffix: '.json'
    });

    $translateProvider.determinePreferredLanguage();

    $translateProvider.registerAvailableLanguageKeys(['fr', 'en'], {
      'fr_ca': 'fr',
      'fr_fr': 'fr',
      'fr_ch': 'fr',
      'en_US': 'en',
      'en_GB': 'en',
      'en_CA': 'en'
    });
  }

})();
