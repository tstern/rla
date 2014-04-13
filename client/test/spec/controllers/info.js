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
			scope.$stateParams = {
				id: 2
			};
			scope.laureates = [{ id: 1 }, { id: 2 }, { id: 3 }];
			InfoCtrl = $controller('InfoCtrl', {
				$scope: scope
			});
		}));

		it('should select laureate with id 2', function () {
			expect(scope.laureate.id).toBe(2);
		});

		it('should have next laureate as right neighbour', function () {
			expect(scope.neighbours.right === 'info3');
		});
	});

}());