(function () {
    'use strict';

    angular
        .module('app.widgets')
        .directive('pvLogOut', pvLogOut);

    pvLogOut.$inject = ['config', '$modal', '$auth', 'coreevents', '$rootScope'];
    /* @ngInject */
    function pvLogOut (config, $modal, $auth, coreevents, $rootScope, $sessionStorage) {
        //Usage:
        //<a href pv-log-out/>
        var directive = {
            link: link,
            restrict: 'A'
        };

        function link(scope, element, attrs) {
            element.bind('click', logout);

            function logout() {
                $rootScope.$broadcast(coreevents.logoutSuccess);
                $auth.logout();
            }
        }

        return directive;
    }
})();
