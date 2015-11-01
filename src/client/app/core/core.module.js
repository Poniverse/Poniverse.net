(function () {
    'use strict';

    angular
        .module('app.core', [
            'ui.router',
            'angular-jsonapi',
            'angular-jsonapi-rest',
            'angular-jsonapi-local',
            'blocks.exception',
            'blocks.logger',
            'blocks.router',
            'duScroll',
            'mgcrea.ngStrap',
            'ngAnimate',
            'ngplus',
            'ngSanitize',
            'ngStorage',
            'satellizer'
        ]);
})();
