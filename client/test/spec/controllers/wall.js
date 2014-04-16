(function () {
	'use strict';

	describe('Controller: WallCtrl', function () {

		var WallCtrl,
			scope;

		// load the controller's module
		beforeEach(module('rla'));

		// Initialize the controller and a mock scope
		beforeEach(inject(function ($controller, $rootScope) {
			scope = $rootScope.$new();
			scope.laureates = [];
			WallCtrl = $controller('WallCtrl', {
				$scope: scope
			});
		}));

		it('should have a slider object', function () {
			expect(scope.slider).not.toBeUndefined();
		});
	});

}());