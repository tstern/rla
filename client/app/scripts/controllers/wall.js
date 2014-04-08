(function () {
	'use strict';

	angular.module('rla')

		.controller('WallCtrl', ['$scope', 'ResourceService',
			function ($scope, ResourceService) {
				$scope.laureates = null;

				$scope.neighbours = {
					left: 'list',
					right: 'map'
				};

				$scope.title = 'Wall';
			}]);

}());