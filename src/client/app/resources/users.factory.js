(function () {
    'use strict';

    angular
        .module('app.resources')
        .run(appRun)
        .factory('Users', Users);

    function appRun(config, $jsonapi) {
        var usersSchema = {
            type: 'users',
            id: 'uuid4',
            attributes: {
                username: {presence: true, length: {maximum: 255, minimum: 3}},
                display_name: {presence: true, length: {maximum: 255, minimum: 3}},
                email: {presence: true, length: {maximum: 255, minimum: 3}},
            },
            relationships: {
                'newsletter-subscription': {
                    type: 'hasOne',
                    model: 'newsletter-subscriptions',
                    reflection: false
                }
            }
        };

        var localSource = $jsonapi.sourceLocal.create('users', 'AngularJsonAPI');
        var restSource = $jsonapi.sourceRest.create('users', config.apiUrl + '/users');
        var usersSynchronizer = $jsonapi.synchronizerSimple.create([localSource, restSource]);

        $jsonapi.addResource(usersSchema, usersSynchronizer);
    }

    function Users($jsonapi) {
        return $jsonapi.getResource('users');
    }
})();
