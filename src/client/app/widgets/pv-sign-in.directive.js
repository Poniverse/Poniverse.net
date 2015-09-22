(function () {
    'use strict';

    angular
        .module('app.widgets')
        .directive('pvSignIn', pvSignIn);

    pvSignIn.$inject = ['config', '$modal'];
    /* @ngInject */
    function pvSignIn (config, $modal) {
        //Usage:
        //<img ht-img-person="{{person.imageSource}}"/>
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
                    backdropAnimation: 'fade in'
                };

                console.log('Hello!');

                $modal(modalConfig);
            }
        }

        return directive;
    }
})();
