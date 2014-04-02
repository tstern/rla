/**
 * Created by Thomas on 02.04.2014.
 */
(function () {
	'use strict';

	var dependencies = [];

	angular.module('rla.services', dependencies)

		.service('ResourceService', ['$http', '$q',
			function ($http, $q) {
				var rest = '/rest';

				this.getVersion = function getVersions() {
					var deferred = $q.defer(),
						request = $http({ method: 'GET', url: rest + '/version' });

					request.success(function (data, status, headers, config) {
						deferred.resolve('success');
					});

					request.error(function (data, status, headers, config) {
						deferred.reject('error');
					});

					return deferred.promise;
				};

				this.getLaureates = function getLaureates() {
					var deferred = $q.defer(),
						request = $http({ method: 'GET', url: rest + '/laureates' });

					request.success(function (data, status, headers, config) {
						deferred.resolve('success');
					});

					request.error(function (data, status, headers, config) {
						deferred.reject('error');
					});

					return deferred.promise;
				};

				this.getLaureate = function getLaureate(id) {
					var deferred = $q.defer(),
						request = $http({ method: 'GET', url: rest + '/laureate/' + id });

					request.success(function (data, status, headers, config) {
						deferred.resolve('success');
					});

					request.error(function (data, status, headers, config) {
						deferred.reject('error');
					});

					return deferred.promise;
				};
			}]);
}());