(function() {
  'use strict';

  angular
      .module('workshop')
      .service('webDevTec', webDevTec);

  /** @ngInject */
  function webDevTec() {
    var data = [
      {
        'title': 'WebDev.AngularJS.TITLE',
        'url': 'https://angularjs.org/',
        'description': 'WebDev.AngularJS.DESC',
        'logo': 'angular.png'
      },
      {
        'title': 'WebDev.BrowserSync.TITLE',
        'url': 'http://browsersync.io/',
        'description': 'WebDev.BrowserSync.DESC',
        'logo': 'browsersync.png'
      },
      {
        'title': 'WebDev.GulpJS.TITLE',
        'url': 'http://gulpjs.com/',
        'description': 'WebDev.GulpJS.DESC',
        'logo': 'gulp.png'
      },
      {
        'title': 'WebDev.Jasmine.TITLE',
        'url': 'http://jasmine.github.io/',
        'description': 'WebDev.Jasmine.DESC',
        'logo': 'jasmine.png'
      },
      {
        'title': 'WebDev.Karma.TITLE',
        'url': 'http://karma-runner.github.io/',
        'description': 'WebDev.Karma.DESC',
        'logo': 'karma.png'
      },
      {
        'title': 'WebDev.Protractor.TITLE',
        'url': 'https://github.com/angular/protractor',
        'description': 'WebDev.Protractor.DESC',
        'logo': 'protractor.png'
      }
    ];

    this.getTec = getTec;

    function getTec() {
      return data;
    }
  }

})();
