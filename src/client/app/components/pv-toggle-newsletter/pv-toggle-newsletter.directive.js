(function () {
    'use strict';

    angular
        .module('app.components')
        .directive('pvToggleNewsletter', pvToggleNewsletter);

    function pvToggleNewsletter () {
        //Usage:
        //<pv-toggle-newsletter pv-user="vm.user">Sign In</button>
        var directive = {
            restrict: 'E',
            scope: {
                'pvUser': '='
            },
            controller: 'PvNewsletterController',
            controllerAs: 'vm',
            templateUrl: 'app/components/pv-toggle-newsletter/pv-toggle-newsletter.html'
        };

        return directive;
    }
})();
