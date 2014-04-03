(function () {
	'use strict';

	angular.module('rla')

		.controller('WallCtrl', ['$scope', 'ResourceService',
			function ($scope, ResourceService) {
				$scope.title = 'Wall';
			}]);

}());