/**
 * Created by Thomas on 03.04.2014.
 */
(function () {
	'use strict';

	angular.module('rla')

		.service('RESTService', ['$http', '$q',
			function ($http, $q) {
				var REST_BASE_URL = '/rest';

				this.readVersion = function readVersion() {
					var deferred = $q.defer(),
						request = $http({ method: 'GET', url: REST_BASE_URL + '/version' });

					request.success(function (data, status, headers, config) {
						deferred.resolve(data);
					});

					request.error(function (data, status, headers, config) {
						deferred.reject('Couldn\'t read version from server.');
					});

					return deferred.promise;
				};

				this.readLaureates = function readLaureates() {
					var deferred = $q.defer(),
						request = $http({ method: 'GET', url: REST_BASE_URL + '/laureates' });

					request.success(function (data, status, headers, config) {
						deferred.resolve(data);
					});

					request.error(function (data, status, headers, config) {
						deferred.reject('Couldn\'t read laureates from server.');
					});

					return deferred.promise;
				};
			}]);
}());