(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('htTopNav', htTopNav);

    /* @ngInject */
    function htTopNav () {
        var directive = {
            bindToController: true,
            controller: TopNavController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
                'inHeader': '='
            },
            templateUrl: 'app/layout/ht-top-nav.html'
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
                    navbarHeight = $document.find('#header-nav').height(),
                    triggerHeight = aboutTopPosition - navbarHeight;

                vm.inHeader = $state.current.url === '/' && $document.scrollTop() <= triggerHeight;

                $scope.$applyAsync();
            }
        }

        return directive;
    }
})();
