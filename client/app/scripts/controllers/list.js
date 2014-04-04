(function () {
	'use strict';

	angular.module('rla')

		.controller('ListCtrl', ['$scope', 'ResourceService',
			function ($scope, ResourceService) {
				ResourceService.getLaureates().then(function (laureates) {
					$scope.laureates = laureates;
				});
			}]);

}());