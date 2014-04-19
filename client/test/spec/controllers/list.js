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
			scope.laureates = [];
			ListCtrl = $controller('ListCtrl', {
				$scope: scope
			});
		}));
	});

}());