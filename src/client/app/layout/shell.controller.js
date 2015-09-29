(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$rootScope', '$scope', '$timeout', 'config', 'logger', '$document', '$state', 'coreevents', '$sessionStorage'];
    /* @ngInject */
    function ShellController($rootScope, $scope, $timeout, config, logger, $document, $state, coreevents, $sessionStorage) {
        var vm = this;
        vm.busyMessage = 'Please wait ...';
        vm.isBusy = true;
        vm.inHeader = true;
        vm.currentUser = $sessionStorage.user;

        activate();

        function activate() {
            logger.success(config.appTitle + ' loaded!', null);

            $rootScope.$on(coreevents.loginSuccess, setCurrentUser);
            $rootScope.$on(coreevents.logoutSuccess, unsetCurrentUser);
        }

        function setCurrentUser(event, user) {
            vm.currentUser = user;
            $sessionStorage.user = user;
        }

        function unsetCurrentUser(event) {
            vm.currentUser = null;
            $sessionStorage.user = null;
            $scope.$apply();
        }
    }
})();
