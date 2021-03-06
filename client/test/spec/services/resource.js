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
			ResourceService = $injector.get('ResourceService');
			localStorageService = $injector.get('localStorageService');

			$injector.get('$httpBackend').whenGET(/\.tpl\.html/).respond({});
		}));

		it('should not be undefined', inject(function ($injector) {
			ResourceService = $injector.get('ResourceService');

			expect(ResourceService).not.toBeUndefined();
		}));

		it('should load laureates from local storage in offline mode', inject(function ($injector) {
			spyOn(HelperService, 'isOnlineMode').andReturn(false);
			spyOn(localStorageService, 'get');

			ResourceService.loadLaureates();

			expect(localStorageService.get).toHaveBeenCalledWith('laureates');
		}));

		it('should load laureates from local storage in online mode with an up to date version', inject(function ($injector) {
			var laureates = null;

			spyOn(HelperService, 'isOnlineMode').andReturn(true);
			spyOn(RESTService, 'readVersion').andCallFake(createDeferredMock('1.0'));
			spyOn(localStorageService, 'get').andCallFake(mockFor_localStorageService_get);

			runs(function () {
				$rootScope.$on('laureates:loaded', function (event, _laureates) {
					laureates = _laureates;
				});
				ResourceService.loadLaureates();
			});

			waitsFor(function () {
				return _.isArray(laureates)	;
			}, 'Loading laureates', 500);

			runs(function () {
				expect(RESTService.readVersion).toHaveBeenCalled();
				expect(localStorageService.get.argsForCall[0]).toEqual(['version']);
				expect(localStorageService.get.argsForCall[1]).toEqual(['laureates']);
			});
		}));

		it('should load laureates from server in online mode with an outdated version', inject(function ($injector) {
			var laureates = null;

			spyOn(HelperService, 'isOnlineMode').andReturn(true);
			spyOn(RESTService, 'readVersion').andCallFake(createDeferredMock('2.0'));
			spyOn(RESTService, 'readLaureates').andCallFake(createDeferredMock([]));
			spyOn(localStorageService, 'get').andCallFake(mockFor_localStorageService_get);
			spyOn(localStorageService, 'set');

			runs(function () {
				$rootScope.$on('laureates:loaded', function (event, _laureates) {
					laureates = _laureates;
				});
				ResourceService.loadLaureates();
			});

			waitsFor(function () {
				return laureates !== null;
			}, 'Loading laureates', 500);

			runs(function () {
				expect(RESTService.readVersion).toHaveBeenCalled();
				expect(localStorageService.get).toHaveBeenCalledWith('version');
				expect(RESTService.readLaureates).toHaveBeenCalled();
				expect(localStorageService.set).toHaveBeenCalledWith('laureates', []);
			});
		}));

		function createDeferredMock(resolve) {
			return function () {
				var deferred = $q.defer();
				setTimeout(function () {
					deferred.resolve(resolve);
					$rootScope.$apply();
				});
				return deferred.promise;
			};
		}

		function mockFor_localStorageService_get(key) {
			if (key === 'version') {
				return '1.0';
			}
			if (key === 'laureates') {
				return [];
			}
		}
	});

}());