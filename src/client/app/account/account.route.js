(function() {
    'use strict';

    angular
        .module('app.account')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'account',
                config: {
                    abstract: true,
                    url: '/account',
                    templateUrl: 'app/account/shell.html',
                    controller: 'AccountController',
                    controllerAs: 'vm',
                    title: 'Account'
                }
            },
            {
                state: 'account.settings',
                config: {
                    url: '',
                    templateUrl: 'app/account/settings.html',
                    title: 'Settings'
                }
            },
        ];
    }
})();
