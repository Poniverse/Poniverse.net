(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('LoginController', LoginController);

    function LoginController($rootScope, $scope, coreevents, $auth) {
        var vm = this;

        vm.login = login;

        function login() {
            var credentials = {
                username: vm.username,
                password: vm.password
            };

            $auth.login(credentials).then(function (data) {
                console.log('Broadcasting success!');

                $rootScope.$broadcast(coreevents.loginSuccess, data.data.user);

                $scope.$hide();
            }, function (data) {
                // TODO: Error handling
                console.log('Failure!');
                console.log(data);
            });
        }
    }
})();
