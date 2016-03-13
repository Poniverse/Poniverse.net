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
        apiUrl: 'http://api.poniverse.poni',
        signupUrl: '/api/sign-up',
        loginUrl: '/api/auth',
        logoutUrl: '/api/clearauth'
    };

    core.value('config', config);

    core.config(configure);

    function configure(
        $logProvider,
        routerHelperProvider,
        exceptionHandlerProvider,
        $authProvider,
        laddaProvider
    ) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(config.appErrorPrefix);
        routerHelperProvider.configure({docTitle: ' - ' +  config.appTitle});
        $authProvider.signupUrl = config.signupUrl;
        $authProvider.loginUrl = config.loginUrl;
        $authProvider.unlinkUrl = config.loginUrl;
        $authProvider.tokenName = 'access_token';

        laddaProvider.setOption({
            style: 'expand-right'
        });
    }

})();
