(function() {
    'use strict';

    angular
        .module('blocks.recover-session')
        .config(Config)
        .factory('RecoverSessionInterceptor', RecoverSessionInterceptor);

    function Config($httpProvider) {
        $httpProvider.interceptors.push('RecoverSessionInterceptor');
    }

    // The intention of this is to intercept 401'ed requests and attempt to fulfill
    // them by either refreshing the access token or, failing that, asking them
    // to login again.
    function RecoverSessionInterceptor($q, $injector, $rootScope, config, coreevents) {
        var factory = {
            responseError: error
        };

        return factory;

        function error(response) {
            var deferred, $http, $auth, PvSignIn;

            // We're only dealing with with 401's and ignoring login auth failures
            if (response.status !== 401 || response.config.url === config.loginUrl) {
                return $q.reject(response);
            }

            deferred = $q.defer();
            $http = $injector.get('$http');
            $auth = $injector.get('$auth');
            PvSignIn = $injector.get('PvSignIn');

            $http.post('/api/refresh-token').then(deferred.resolve, deferred.reject);

            return deferred.promise.then(refreshSuccess, refreshFailure);

            function refreshSuccess(res) {
                $auth.setToken(res.data.access_token);

                return $http(response.config);
            }

            function refreshFailure() {
                var defer = $q.defer();

                PvSignIn.show();

                $rootScope.$on(coreevents.loginSuccess, defer.resolve);

                // TODO: There should probably be some logic here to timeout the login box
                // otherwise it would be possible to login like 5 hours after an initial
                // request and have, lets say, a user update take place. Though
                // the risk of that is quite small.

                return defer.promise.then(loginSuccess);
            }

            function loginSuccess() {
                return $http(response.config);
            }
        }
    }
}());
