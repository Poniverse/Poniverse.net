(function () {
    'use strict';

    angular
        .module('app.resources')
        .factory('Resource', AbstractResource);

    function AbstractResource($http, $q, config) {
        function Resource() {
            var endpoint = '';
        }

        Resource.prototype = {
            new: function() {
                return angular.copy(this);
            },
            setData: function (data) {
                this.data = data;
                this.form = angular.copy(data);

                return this;
            },
            load: function (id) {
                var object = this;
                var deferred = $q.defer();

                $http.get(this.endpoint + '/' + id).then(success);

                return deferred.promise;

                function success(req) {
                    object.setData(req.data);

                    deferred.resolve(object);
                }
            },
            reload: function() {
                return this.load(this.data['id']);
            },
            update: function (updateDataWithForm) {
                if (typeof updateDataWithForm === 'undefined') {
                    updateDataWithForm = false;
                }

                var changedData = {};
                var deferred = $q.defer();
                var object = this;

                for (var attribute in this.form) {
                    if (
                        this.form.hasOwnProperty(attribute) &&
                        this.form[attribute] !== this.data[attribute]
                    ) {
                        changedData[attribute] = this.form[attribute];
                    }
                }

                $http.patch(this.endpoint + '/' + this.data['id'], changedData)
                    .then(success).catch(failure);

                return deferred.promise;

                function success(data) {
                    if (!updateDataWithForm) {
                        object.data = angular.copy(object.form);
                    }

                    deferred.resolve(object);
                }

                function failure(data) {
                    deferred.reject(data);
                }
            }
        };

        return Resource;
    }
})();
