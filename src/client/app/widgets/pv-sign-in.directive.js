(function () {
    'use strict';

    angular
        .module('app.widgets')
        .directive('pvSignIn', pvSignIn);

    pvSignIn.$inject = ['config', '$modal', '$auth', 'coreevents', '$rootScope'];
    /* @ngInject */
    function pvSignIn (config, $modal, $auth, coreevents, $rootScope) {
        //Usage:
        //<button class="button" pv-sign-in>Sign In</buttton>
        var directive = {
            link: link,
            restrict: 'A'
        };

        function link(scope, element, attrs) {
            element.bind('click', openModal);

            function openModal() {
                var modalConfig = {
                    title: 'Sign In',
                    template: 'app/widgets/pv-sign-in.html',
                    controller: LoginController,
                    controllerAs: 'vm'
                };

                $modal(modalConfig);
            }
        }

        function LoginController($scope) {
            var vm = this;

            vm.login = login;

            function login() {
                var credentials = {
                    username: vm.username,
                    password: vm.password
                };

                $auth.login(credentials).then(function (data) {
                    console.log('Broadcasting success!');

                    $rootScope.$broadcast(coreevents.loginSuccess, data.data.user);

                    $scope.$hide();
                }, function (data) {
                    console.log('Failure!');
                    console.log(data);
                });
            }
        }

        return directive;
    }
})();
