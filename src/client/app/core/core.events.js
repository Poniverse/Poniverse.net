(function () {
    'use strict';

    var core = angular.module('app.core');

    var events = {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    };

    core.value('coreevents', events);
})();
