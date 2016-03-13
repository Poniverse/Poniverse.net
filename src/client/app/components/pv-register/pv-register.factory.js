(function () {
    'use strict';

    angular
        .module('app.components')
        .factory('PvRegister', PvRegister);

    function PvRegister($modal, $auth, $rootScope, coreevents) {
        var factory = {
            show: show
        };

        return factory;

        function show() {
            var modalConfig = {
                title: 'Sign In',
                templateUrl: 'app/components/pv-register/pv-register.html',
                controller: 'RegistrationController',
                controllerAs: 'vm',
                prefix: 'pvRegister'
            };

            $modal(modalConfig);
        }
    }
})();
