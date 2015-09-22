(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('pvBottomFooter', pvBottomFooter);

    /* @ngInject */
    function pvBottomFooter () {
        var directive = {
            bindToController: true,
            controller: BottomFooterController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
                'inHeader': '='
            },
            templateUrl: 'app/layout/pv-bottom-footer.html'
        };

        /* @ngInject */
        function BottomFooterController() {
            var vm = this;
        }

        return directive;
    }
})();
