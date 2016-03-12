(function () {
    'use strict';

    angular
        .module('app.account')
        .controller('AccountController', AccountController);

    function AccountController($q, logger, User, $scope, $rootScope) {
        var vm = this;
        var listener;
        vm.user = $scope.vm.currentUser;
        vm.update = update;
        vm.updatePassword = updatePassword;

        activate();

        ////////

        function activate() {
            listener = $rootScope.$on('$stateChangeStart', removePasswordFormData);
        }

        function update() {
            vm.user.update().then(success).catch(failure);

            function  success() {
                $rootScope.setCurrentUser(null, vm.user.data);
            }

            function failure(err) {
                console.log('Failure!');
                console.log(err);
            }
        }

        function updatePassword() {
            vm.user.update(false).then(success, failure);

            function success() {
                removePasswordFormData();
                console.log('Success!');
                console.log(arguments);
            }

            function failure(err) {
                console.log('Failure!');
                console.log(err);
            }
        }

        function removePasswordFormData(event) {
            console.log(event);

            var attributesToDelete = [
                'current_password',
                'password',
                'password_confirmation'
            ];

            attributesToDelete.forEach(function (attribute) {
                delete vm.user.data[attribute];
                delete vm.user.form[attribute];
            });

            // Unbind the rootScope listener
            if (typeof event !== 'undefined' && typeof listener !== 'undefined') {
                listener();
            }
        }
    }
})();
