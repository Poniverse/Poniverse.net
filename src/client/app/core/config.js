(function () {
    'use strict';

    var core = angular.module('app.core');

    core.config(toastrConfig);

    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        appErrorPrefix: '[Poniverse Error] ',
        appTitle: 'Poniverse',
        apiUrl: 'http://api.poniverse.local'
    };

    core.value('config', config);

    core.config(configure);

    function configure($logProvider, routerHelperProvider, exceptionHandlerProvider, $authProvider) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(config.appErrorPrefix);
        routerHelperProvider.configure({docTitle: ' - ' +  config.appTitle});
        $authProvider.loginUrl = '/api/auth';
        $authProvider.unlinkUrl = '/api/clearauth';
        $authProvider.tokenName = 'access_token';
    }

})();
