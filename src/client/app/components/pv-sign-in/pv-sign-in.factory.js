(function () {
    'use strict';

    angular
        .module('app.components')
        .factory('SignIn', SignIn);

    function SignIn($modal, $auth, $rootScope) {
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
