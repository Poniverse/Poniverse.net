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
                'navline': '='
            },
            templateUrl: 'app/layout/ht-top-nav.html'
        };

        /* @ngInject */
        function TopNavController($document, $element, $window, $state) {
            var vm = this;

            vm.inHeader = true;

            activate();

            function activate() {
                checkWithinIntro();

                $document.on('scroll', checkWithinIntro);
            }

            function checkWithinIntro() {
                var aboutHeight = $document.find('#about').offset().top;

                vm.inHeader = $state.current.url === '/' && $document.scrollTop() <= aboutHeight;

                console.log(vm.inHeader);
            }
        }

        return directive;
    }
})();
