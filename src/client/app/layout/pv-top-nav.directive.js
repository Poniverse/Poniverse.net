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
                'inHeader': '='
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
                if ($state.current.name !== 'home') {
                    vm.inHeader = false;
                    $scope.$applyAsync();

                    return;
                }

                var aboutTopPosition = $document.find('#about').offset().top,
                    navbarHeight = $document.find('#pv-top-nav').height(),
                    triggerHeight = aboutTopPosition - navbarHeight - 1;

                vm.inHeader = $document.scrollTop() <= triggerHeight;

                $scope.$applyAsync();
            }
        }

        return directive;
    }
})();
