/**
 * Created by Thomas on 02.04.2014.
 */
(function () {
	'use strict';

	angular.module('rla')

		.service('ResourceService', ['$q', '$rootScope', 'RESTService', 'HelperService', 'localStorageService',
			function ($q, $rootScope, RESTService, HelperService, localStorageService) {
				this.loadLaureates = function loadLaureates() {
					if (HelperService.isOnlineMode()) {
						searchForUpdate()
							.then(tryToUpdate)
							.catch(failure)
							.finally(loadLaureatesFromLocalStorage);
					} else {
						loadLaureatesFromLocalStorage();
					}
				};

				function searchForUpdate() {
					var localVersion = localStorageService.get('version'),
						deferred = $q.defer();

					$rootScope.$emit('laureates:notify', 'Searching for an update.');

					RESTService.readVersion().then(function (version) {
						deferred.resolve(localVersion === version);
					}, function (errorMsg) {
						deferred.reject(errorMsg);
					});

					return deferred.promise;
				}

				function tryToUpdate(upToDate) {
					var deferred = $q.defer();

					if (upToDate) {
						$rootScope.$emit('laureates:notify', 'Local version of laureates is up to date.');
						deferred.resolve();

					} else {
						$rootScope.$emit('laureates:notify', 'Downloading new version of laureates.');
						RESTService.readLaureates().then(function (laureates) {
							saveLaureatesToLocalStorage(laureates);
							deferred.resolve();
						}, function (errorMsg) {
							deferred.reject(errorMsg);
						});
					}

					return deferred.promise;
				}

				function saveLaureatesToLocalStorage(laureates) {
					localStorageService.set('laureates', laureates);
				}

				function loadLaureatesFromLocalStorage() {
					var laureates = localStorageService.get('laureates');

					if (_.isArray(laureates)) {
						$rootScope.$emit('laureates:loaded', laureates);
					} else {
						failure('Couldn\'t load laureates from local storage.');
					}
				}

				function failure(error) {
					$rootScope.$emit('laureates:error', error);
				}
			}]);
}());