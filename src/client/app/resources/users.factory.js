(function () {
    'use strict';

    angular
        .module('app.resources')
        .factory('User', User);

    function User(Resource, config, $http) {
        var user = new Resource();
        user.endpoint = config.apiUrl + '/users';
        user.subscribe = subscribe;
        user.unsubscribe = unsubscribe;

        return user;

        function subscribe() {
            return $http.post(this.endpoint + '/' + this.data['id'] + '/newsletter');
        }

        function unsubscribe() {
            return $http.delete(this.endpoint + '/' + this.data['id'] + '/newsletter');
        }
    }
})();
