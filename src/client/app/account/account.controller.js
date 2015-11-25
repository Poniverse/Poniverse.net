(function () {
    'use strict';

    angular
        .module('app.account')
        .controller('AccountController', AccountController);

    function AccountController($q, logger, Users, $scope, $rootScope) {
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
            vm.user.save().then(success, failure);

            function success() {
                console.log('Success!');
                console.log(arguments);
            }

            function failure(err) {
                console.log('Failure!');
                console.log(err);
            }
        }

        function updatePassword() {
            vm.user.save().then(success, failure);

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
            // TODO: Come back and review this
            delete vm.user.form.data.attributes['current_password'];
            delete vm.user.form.data.attributes['password'];
            delete vm.user.form.data.attributes['password_confirmation'];

            // Unbind the rootScope listener
            if (typeof event !== 'undefined') {
                listener();
            }
        }
    }
})();
