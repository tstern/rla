(function () {
	'use strict';

	describe('Controller: InfoCtrl', function () {

		var InfoCtrl,
			scope;

		// load the controller's module
		beforeEach(module('rla'));

		// Initialize the controller and a mock scope
		beforeEach(inject(function ($rootScope) {
			scope = $rootScope.$new();
			scope.laureates = [{ id: 1 }, { id: 2 }, { id: 3 }];
		}));

		it('should select laureate with id 2', inject(function ($controller) {
			scope.$stateParams = {
				id: 2
			};

			InfoCtrl = $controller('InfoCtrl', {
				$scope: scope
			});

			expect(scope.laureate.id).toBe(2);
		}));

		it('should navigate to not found page', inject(function ($controller) {
			spyOn(scope.$state, 'go');

			scope.$stateParams = {
				id: 4
			};

			InfoCtrl = $controller('InfoCtrl', {
				$scope: scope
			});

			expect(scope.$state.go).toHaveBeenCalledWith('notFound');
		}));
	});

}());