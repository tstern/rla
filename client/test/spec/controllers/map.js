(function () {
	'use strict';

	describe('Controller: MapCtrl', function () {

		var MapCtrl,
			scope;

		// load the controller's module
		beforeEach(module('rla'));

		// Initialize the controller and a mock scope
		beforeEach(inject(function ($controller, $rootScope) {
			scope = $rootScope.$new();
			scope.laureates = [{ coordinate: '(100,250)' }];
			MapCtrl = $controller('MapCtrl', {
				$scope: scope
			});
		}));

		it('should extract coordinates correct', function () {
			expect(scope.laureates[0].coord).toEqual(['100', '250']);
		});
	});

}());