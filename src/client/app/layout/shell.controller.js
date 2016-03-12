(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);

    function ShellController(
        $rootScope,
        $scope,
        config,
        logger,
        coreevents,
        $sessionStorage,
        User
    ) {
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

            $rootScope.setCurrentUser = setCurrentUser;
            $rootScope.$on(coreevents.loginSuccess, setCurrentUser);
            $rootScope.$on(coreevents.logoutSuccess, unsetCurrentUser);
        }

        function setCurrentUser(event, user) {
            vm.currentUser = User.new().setData(user);
            vm.currentUser.load(user.id).then(loadSuccess);

            function loadSuccess(user) {
                console.log(vm.currentUser);
                $sessionStorage.user = user.data;
            }
        }

        function unsetCurrentUser(event) {
            vm.currentUser = null;
            $sessionStorage.user = null;
            $scope.$apply();
        }
    }
})();
