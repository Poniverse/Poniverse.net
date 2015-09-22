(function() {
    'use strict';

    angular
        .module('app.content')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'home',
                config: {
                    url: '/',
                    templateUrl: 'app/content/home.html',
                    controller: 'ContentController',
                    controllerAs: 'vm',
                    title: 'Home'
                }
            },
            {
                state: 'api-docs',
                config: {
                    url: '/api',
                    templateUrl: 'app/content/api.html',
                    controller: 'ContentController',
                    controllerAs: 'vm',
                    title: 'API Documentation'
                }
            },
            {
                state: 'partners',
                config: {
                    url: '/partners',
                    templateUrl: 'app/content/partners.html',
                    controller: 'ContentController',
                    controllerAs: 'vm',
                    title: 'Partners'
                }
            },
            {
                state: 'privacy-policy',
                config: {
                    url: '/privacy-policy',
                    templateUrl: 'app/content/privacy-policy.html',
                    controller: 'ContentController',
                    controllerAs: 'vm',
                    title: 'Privacy Policy'
                }
            },
            {
                state: 'tos',
                config: {
                    url: '/tos',
                    templateUrl: 'app/content/tos.html',
                    controller: 'ContentController',
                    controllerAs: 'vm',
                    title: 'Terms of Service'
                }
            }
        ];
    }
})();
