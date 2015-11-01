(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$rootScope', '$scope', '$timeout', 'config', 'logger', '$document', '$state', 'coreevents', '$sessionStorage', 'Users'];
    /* @ngInject */
    function ShellController($rootScope, $scope, $timeout, config, logger, $document, $state, coreevents, $sessionStorage, Users) {
        var vm = this;
        vm.busyMessage = 'Please wait ...';
        vm.isBusy = true;
        vm.inHeader = true;
        vm.currentUser = null;

        activate();

        function activate() {
            logger.success(config.appTitle + ' loaded!', null);

            if ($sessionStorage.user) {
                setCurrentUser(null, $sessionStorage.user);
            }

            console.log(vm.currentUser);

            $rootScope.$on(coreevents.loginSuccess, setCurrentUser);
            $rootScope.$on(coreevents.logoutSuccess, unsetCurrentUser);
        }

        function setCurrentUser(event, user) {
            vm.currentUser = Users.initialize();
            vm.currentUser.new = false;
            vm.currentUser.stable = true;
            vm.currentUser.synchronized = true;
            vm.currentUser.data = user.data;

            vm.currentUser.refresh();

            $sessionStorage.user = user;
        }

        function unsetCurrentUser(event) {
            vm.currentUser = null;
            $sessionStorage.user = null;
            $scope.$apply();
        }
    }
})();
