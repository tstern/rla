(function () {
	'use strict';

	angular.module('rla')

		.controller('MapCtrl', ['$scope', 'ResourceService',
			function ($scope) {
				$scope.laureates = null;

				$scope.neighbours = {
					left: 'wall',
					right: 'list'
				};

				$scope.title = 'Map';
			}]);

}());