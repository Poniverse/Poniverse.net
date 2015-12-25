(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('PvNewsletterController', PvNewsletterController);

    function PvNewsletterController($rootScope, $scope, $log, UserNewsletter) {
        var vm = this;

        vm.user = $scope.pvUser;
        vm.loading = false;
        vm.subscribed = false;
        vm.buttonStatus = 'just a moment...';

        vm.toggle = toggle;

        activate();

        ///

        function activate() {
            var isSubscribed = typeof vm.user.relationships['newsletter-subscription'] !== 'undefined';

            setSubsribedStatus(isSubscribed);
        }

        function setSubsribedStatus(isSubscribed) {
            vm.subscribed = isSubscribed;
            vm.buttonStatus = vm.subscribed ? 'Unsubscribe' : 'Sign me up!';
        }

        function toggle() {
            return vm.subscribed ? unsubscribe() : subscribe();
        }

        function subscribe() {
            vm.loading = true;

            UserNewsletter.subscribe(vm.user).then(success, failure);
        }

        function unsubscribe() {
            vm.loading = true;

            UserNewsletter.unsubscribe(vm.user).then(success, failure);
        }

        function success(data) {
            vm.loading = false;

            $log.debug('Successfully toggled subscription!');

            setSubsribedStatus(data.status === 201);
        }

        function failure() {
            vm.loading = false;

            $log.debug('Error in toggling subscription!');
        }
    }
})();
