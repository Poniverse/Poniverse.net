(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('pvTopNav', pvTopNav);

    /* @ngInject */
    function pvTopNav () {
        var directive = {
            bindToController: true,
            controller: TopNavController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
                'inHeader': '=',
                'user': '='
            },
            templateUrl: 'app/layout/pv-top-nav.html'
        };

        /* @ngInject */
        function TopNavController($scope, $document, $state, $rootScope) {
            var vm = this;

            activate();

            function activate() {
                checkWithinIntro();

                $document.on('scroll', checkWithinIntro);
                $rootScope.$on('$viewContentLoaded', checkWithinIntro);
            }

            function checkWithinIntro() {
                // At the time of development the homepage is the only
                // intended target for the in-header class toggle.
                if ($state.current.name !== 'home') {
                    // Prevent overzealous scope updates by only updating
                    // when in-header is true.
                    if (vm.inHeader === true) {
                        vm.inHeader = false;
                        $scope.$applyAsync();
                    }

                    return;
                }

                var aboutTopPosition = $document.find('#about').offset().top,
                    navbarHeight = $document.find('#pv-top-nav').height(),
                    triggerHeight = aboutTopPosition - navbarHeight - 1,
                    oldValue = vm.inHeader;

                vm.inHeader = $document.scrollTop() <= triggerHeight;

                // Prevent overzealous scope updates by only updating
                // it when the value has actually changed.
                if (vm.inHeader !== oldValue) {
                    $scope.$applyAsync();
                }
            }
        }

        return directive;
    }
})();
