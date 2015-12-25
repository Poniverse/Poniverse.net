(function () {
    'use strict';

    angular
        .module('app.resources')
        .factory('UserNewsletter', UserNewsletter);

    function UserNewsletter($http) {
        var factory = {
            subscribe: subscribe,
            unsubscribe: unsubscribe
        };

        return factory;

        function subscribe($user) {
            return $http.post($user.data.links.self + '/newsletter');
        }

        function unsubscribe($user) {
            return $http.delete($user.data.links.self + '/newsletter');
        }
    }
})();
