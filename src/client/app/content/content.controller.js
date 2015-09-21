(function () {
    'use strict';

    angular
        .module('app.content')
        .controller('ContentController', ContentController);

    ContentController.$inject = ['$q', 'logger'];
    /* @ngInject */
    function ContentController($q, logger) {
        var vm = this;
        vm.title = 'Home';
    }
})();
