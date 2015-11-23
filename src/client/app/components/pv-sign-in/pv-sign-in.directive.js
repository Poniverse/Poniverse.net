(function () {
    'use strict';

    angular
        .module('app.components')
        .directive('pvSignIn', pvSignIn);

    function pvSignIn (PvSignIn) {
        //Usage:
        //<button class="button" pv-sign-in>Sign In</button>
        var directive = {
            link: link,
            restrict: 'A'
        };

        function link(scope, element, attrs) {
            element.bind('click', openModal);

            function openModal() {
                PvSignIn.show();
            }
        }

        return directive;
    }
})();
