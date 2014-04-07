/**
 * Created by Thomas on 02.04.2014.
 */
(function () {
	'use strict';

	angular.module('rla')

		.service('ResourceService', ['$q', 'RESTService', 'HelperService', 'localStorageService',
			function ($q, RESTService, HelperService, localStorageService) {
				var offline = HelperService.isOfflineMode(),
					deferredLaureates = $q.defer(),
					laureates = null;

				this.getLaureates = function getLaureates() {
					return deferredLaureates.promise;
				};

				initialize();

				function initialize() {
					if (offline) {
						resolveLaureates();
					} else {
						searchForUpdate()
							.then(tryToUpdate)
							.then(resolveLaureates);
					}
				}

				function resolveLaureates() {
					if (_.isNull(laureates)) {
						laureates = localStorageService.get('laureates');
					}
					deferredLaureates.resolve(laureates);
				}

				function searchForUpdate() {
					var version = localStorageService.get('version'),
						deferred = $q.defer();

					console.log('search');

					RESTService.readVersion().then(function (currentVersion) {
						console.log('successA');
						deferred.resolve(version !== currentVersion);
					}, function (errorMsg) {
						console.log('errorA');
						console.warn(errorMsg);
						deferred.resolve(false);
					});

					return deferred.promise;
				}

				function tryToUpdate(update) {
					var deferred = $q.defer();

					if (update) {
						RESTService.readLaureates().then(function (newLaureates) {
							localStorageService.set('laureates', newLaureates);
							laureates = newLaureates;
							deferred.resolve();
						}, function (errorMsg) {
							console.warn(errorMsg);
							deferred.resolve();
						});
					} else {
						deferred.resolve();
					}

					return deferred.promise;
				}
			}]);
}());