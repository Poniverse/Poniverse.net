(function () {
    'use strict';

    angular
        .module('app.components')
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
                // Broadcasts the logout event.
                $rootScope.$broadcast(coreevents.logoutSuccess);

                // Removes the access token from localStorage.
                $auth.logout();

                // Makes a call to the server to remove the
                // cookie from storage.
                $auth.unlink();
            }
        }

        return directive;
    }
})();
