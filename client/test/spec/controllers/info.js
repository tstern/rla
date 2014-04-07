(function () {
	'use strict';

	describe('Controller: InfoCtrl', function () {

		var InfoCtrl,
			scope;

		// load the controller's module
		beforeEach(module('rla'));

		// Initialize the controller and a mock scope
		beforeEach(inject(function ($controller, $rootScope) {
			scope = $rootScope.$new();
			InfoCtrl = $controller('InfoCtrl', {
				$scope: scope
			});
		}));

		it('should attach laureates variable', function () {
			expect(scope.laureate).not.toBeUndefined();
		});
	});

}());