(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('RegistrationController', RegistrationController);

    function RegistrationController($rootScope, $scope, coreevents, $auth) {
        var vm = this;

        vm.register = register;
        vm.complete = false;
        vm.form = {};

        function register() {
            $auth.signup(vm.form).then(function (data) {
                console.log('Broadcasting success!');
                vm.complete = true;
            }, function (data) {
                // TODO: Error handling
                console.log('Failure!');
                console.log(data);
            });
        }
    }
})();
