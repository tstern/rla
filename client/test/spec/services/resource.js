/**
 * Created by Thomas on 07.04.2014.
 */
(function () {
	'use strict';

	describe('Service: ResourceService', function () {

		var $q,
			$rootScope,
			RESTService,
			HelperService,
			ResourceService,
			localStorageService;

		beforeEach(module('rla'));

		beforeEach(inject(function ($injector) {
			$q = $injector.get('$q');
			$rootScope = $injector.get('$rootScope');
			RESTService = $injector.get('RESTService');
			HelperService = $injector.get('HelperService');
			localStorageService = $injector.get('localStorageService');

			$injector.get('$httpBackend').whenGET(/\.tpl\.html/).respond({});
		}));

		it('should not be undefined', inject(function ($injector) {
			ResourceService = $injector.get('ResourceService');

			expect(ResourceService).not.toBeUndefined();
		}));

		it('should load laureates from local storage in offline mode', inject(function ($injector) {
			spyOn(HelperService, 'isOfflineMode').andReturn(true);
			spyOn(localStorageService, 'get');

			ResourceService = $injector.get('ResourceService');

			expect(localStorageService.get).toHaveBeenCalledWith('laureates');
		}));

		it('should load laureates from local storage in online mode with an up to date version', inject(function ($injector) {
			var laureates = null,
				version = '1.0';

			spyOn(HelperService, 'isOfflineMode').andReturn(false);
			spyOn(RESTService, 'readVersion').andCallFake(mockFor_RESTService_readVersion);
			spyOn(localStorageService, 'get').andCallFake(mockFor_localStorageService_get);

			runs(function () {
				ResourceService = $injector.get('ResourceService');
				ResourceService.getLaureates().then(function (_laureates) {
					laureates = _laureates;
				});
			});

			waitsFor(function () {
				return laureates !== null;
			}, 'The laureates should be loaded', 500);

			runs(function () {
				expect(RESTService.readVersion).toHaveBeenCalled();
				expect(localStorageService.get.argsForCall[0]).toEqual(['version']);
				expect(localStorageService.get.argsForCall[1]).toEqual(['laureates']);
			});

			function mockFor_RESTService_readVersion() {
				var deferred = $q.defer();
				setTimeout(function () {
					deferred.resolve(version);
					$rootScope.$apply();
				});
				return deferred.promise;
			}

			function mockFor_localStorageService_get(key) {
				if (key === 'version') {
					return version;
				} else {
					return [];
				}
			}
		}));
	});

}());