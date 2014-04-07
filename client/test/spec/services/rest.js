/**
 * Created by Thomas on 07.04.2014.
 */
(function () {
	'use strict';

	describe('Service: RESTService', function () {

		var RESTService,
			$httpBackend;

		beforeEach(module('rla'));

		beforeEach(inject(function ($injector) {
			RESTService = $injector.get('RESTService');
			$httpBackend = $injector.get('$httpBackend');

			$httpBackend.whenGET('rest/version').respond('1.0');
			$httpBackend.whenGET('/rest/laureates').respond(getTestLaureates());
		}));

		it('should not be undefined', function () {
			expect(RESTService).not.toBeUndefined();
		});

		describe('readVersion()', function () {
			it('should respond a version number', function () {
				RESTService.readVersion().then(function (version) {
					expect(version).toBe('1.0');
				});
			});
		});

		describe('readLaureates()', function () {
			it('should respond a correct list of laureates', function () {
				RESTService.readLaureates().then(function (laureates) {
					expect(laureates).toEqual(getTestLaureates());
				});
			});
		});
	});

	function getTestLaureates() {
		return [
			{ id: 1, year: 2001, name: 'Anton Alpha' },
			{ id: 2, year: 2002, name: 'Berta Bravo' },
			{ id: 3, year: 2003, name: 'Dora Delta' },
			{ id: 4, year: 2004, name: 'Emil Echo' },
			{ id: 5, year: 2005, name: 'Friedrich Foxtrot' },
			{ id: 6, year: 2006, name: 'Gustav Golf' },
			{ id: 7, year: 2007, name: 'Heinrich Hotel' },
			{ id: 8, year: 2008, name: 'Ida India' },
			{ id: 9, year: 2009, name: 'Julius Juliett' }
		]
	}

}());