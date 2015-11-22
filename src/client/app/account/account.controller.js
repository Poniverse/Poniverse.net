(function () {
    'use strict';

    angular
        .module('app.account')
        .controller('AccountController', AccountController);

    function AccountController($q, logger, Users, $scope) {
        var vm = this;
        vm.user = $scope.vm.currentUser;

        vm.update = update;

        ////////

        function update() {
            vm.user.save().then(success, failure);

            function success() {
                console.log('Success!');
                console.log(arguments);
            }

            function failure(err) {
                console.log('Failure!');
                console.log(err);
            }

            //$scope.vm.currentUser = angular.copy(vm.user);
        }
    }
})();
