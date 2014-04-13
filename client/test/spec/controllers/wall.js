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
		return [
			{
				id: 1,
				image: {
					name: 'alpha',
					width: 200,
					height: 300
				}
			},
			{
				id: 2,
				image: {
					name: 'bravo',
					width: 200,
					height: 300
				}
			},
			{
				id: 3,
				image: {
					name: 'charlie',
					width: 200,
					height: 300
				}
			}
		]
	}

}());