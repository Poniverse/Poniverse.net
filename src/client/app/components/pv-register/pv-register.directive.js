(function () {
    'use strict';

    angular
        .module('app.components')
        .directive('pvRegister', pvRegister);

    function pvRegister (PvRegister) {
        //Usage:
        //<button class="button" pv-register>Sign In</button>
        var directive = {
            link: link,
            restrict: 'A'
        };

        function link(scope, element, attrs) {
            element.bind('click', openModal);

            function openModal() {
                PvRegister.show();
            }
        }

        return directive;
    }
})();
