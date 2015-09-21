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
                state: 'content',
                config: {
                    url: '/',
                    templateUrl: 'app/content/home.html',
                    controller: 'ContentController',
                    controllerAs: 'vm',
                    title: 'Home',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-content"></i> Content'
                    }
                }
            }
        ];
    }
})();
