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
			MapCtrl = $controller('MapCtrl', {
				$scope: scope
			});
		}));

		it('should attach laureates variable', function () {
			expect(scope.laureates).not.toBeUndefined();
		});
	});

}());