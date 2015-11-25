(function () {
    'use strict';

    angular
        .module('app.components')
        .factory('PvSignIn', PvSignIn);

    function PvSignIn($modal, $auth, $rootScope, coreevents) {
        var factory = {
            show: show
        };

        $rootScope.$on('pvSignIn.hide.after', fireLoginFailed);

        return factory;

        function show() {
            var modalConfig = {
                title: 'Sign In',
                templateUrl: 'app/components/pv-sign-in/pv-sign-in.html',
                controller: 'LoginController',
                controllerAs: 'vm',
                prefix: 'pvSignIn'
            };

            $modal(modalConfig);
        }

        // Private

        function fireLoginFailed() {
            $rootScope.$broadcast(coreevents.loginFailed);
        }
    }
})();
