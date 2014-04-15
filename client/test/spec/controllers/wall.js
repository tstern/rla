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
			scope.laureates = getLaureates();
			WallCtrl = $controller('WallCtrl', {
				$scope: scope
			});
		}));

		it('should attach laureates variable', function () {
			expect(scope.laureates).not.toBeUndefined();
		});
	});

	function getLaureates() {
		return []
	}

}());