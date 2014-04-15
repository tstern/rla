(function () {
	'use strict';

	describe('Controller: ListCtrl', function () {

		var ListCtrl,
			scope;

		// load the controller's module
		beforeEach(module('rla'));

		// Initialize the controller and a mock scope
		beforeEach(inject(function ($controller, $rootScope) {
			scope = $rootScope.$new();
			scope.laureates = [{ id: 1, citation: 'laureate1' }, { id: 2, citation: 'laureate2' }, { id: 3, citation: 'laureate3' }];
			ListCtrl = $controller('ListCtrl', {
				$scope: scope
			});
		}));

		it('should have "map" and "list" as neighbours', function () {
			expect(scope.neighbours.left).toBe('map');
			expect(scope.neighbours.right).toBe('wall');
		});
	});

}());