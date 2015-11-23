(function () {
    'use strict';

    angular
        .module('app.components')
        .factory('PvSignIn', PvSignIn);

    function PvSignIn($modal, $auth, $rootScope) {
        var factory = {
            show: show
        };

        return factory;

        function show() {
            var modalConfig = {
                title: 'Sign In',
                templateUrl: 'app/components/pv-sign-in/pv-sign-in.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            };

            $modal(modalConfig);
        }
    }
})();
