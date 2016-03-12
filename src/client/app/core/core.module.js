(function () {
    'use strict';

    angular
        .module('app.core', [
            'ui.router',
            'blocks.exception',
            'blocks.logger',
            'blocks.router',
            'blocks.recover-session',
            'duScroll',
            'mgcrea.ngStrap',
            'ngAnimate',
            'ngplus',
            'ngSanitize',
            'ngStorage',
            'satellizer',
            'angular-ladda'
        ]);
})();
