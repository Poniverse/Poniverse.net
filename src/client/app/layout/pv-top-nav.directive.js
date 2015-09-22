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
        function TopNavController($scope, $document, $state) {
            var vm = this;

            activate();

            function activate() {
                checkWithinIntro();

                $document.on('scroll', checkWithinIntro);
            }

            function checkWithinIntro() {
                var aboutTopPosition = $document.find('#about').offset().top,
                    navbarHeight = $document.find('#pv-top-nav').height(),
                    triggerHeight = aboutTopPosition - navbarHeight;

                vm.inHeader = $state.current.url === '/' && $document.scrollTop() <= triggerHeight;

                $scope.$applyAsync();
            }
        }

        return directive;
    }
})();
