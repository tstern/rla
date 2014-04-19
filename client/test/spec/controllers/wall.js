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

		it('should contain an image', function () {
			expect(scope.images[0].id).toBe(1);
			expect(scope.images[0].title).toBe('Anton Alpha');
		});
	});

	function getLaureates() {
		return [
			{
				id: 1,
				firstname: 'Anton',
				lastname: 'Alpha',
				country: 'AAA',
				year: 2000,
				citation: '... citation ...',
				filename: 'alpha_anton.jpg',
				pictureWidth: 300,
				pictureHeight: 400
			}
		];
	}

}());