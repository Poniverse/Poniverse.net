(function () {
    'use strict';

    angular
        .module('app.widgets')
        .directive('pvSignIn', pvSignIn);

    pvSignIn.$inject = ['config', '$modal', '$auth'];
    /* @ngInject */
    function pvSignIn (config, $modal, $auth) {
        //Usage:
        //<a href ht-img-person="{{person.imageSource}}"/>
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

        function LoginController() {
            var vm = this;

            vm.login = login;

            function login() {
                var credentials = {
                    username: vm.username,
                    password: vm.password
                };

                console.log(credentials);

                $auth.login(credentials).then(function (data) {
                    console.log('Success!');
                    console.log(data);
                }, function (data) {
                    console.log('Failure!');
                    console.log(data);
                });
            }
        }

        return directive;
    }
})();
