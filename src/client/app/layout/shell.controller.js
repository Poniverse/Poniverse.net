(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$rootScope', '$timeout', 'config', 'logger', '$document', '$state'];
    /* @ngInject */
    function ShellController($rootScope, $timeout, config, logger, $document, $state) {
        var vm = this;
        vm.busyMessage = 'Please wait ...';
        vm.isBusy = true;
        $rootScope.showSplash = true;
        vm.inHeader = true;

        activate();

        function activate() {
            logger.success(config.appTitle + ' loaded!', null);
        }
    }
})();
