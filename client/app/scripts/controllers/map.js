(function () {
	'use strict';

	angular.module('rla')

		.controller('MapCtrl', ['$scope', 'ResourceService',
			function ($scope) {

				extractCoordinates();

				function extractCoordinates() {
					var i, coordinate;

					for (i = 0; i < $scope.laureates.length; i++) {
						coordinate = $scope.laureates[i].coordinate.substring(1, $scope.laureates[i].coordinate.length - 1);
						$scope.laureates[i].coord = coordinate.split(',');
					}
				}
			}]);

}());