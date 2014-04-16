(function () {
	'use strict';

	angular.module('rla')

		.controller('MapCtrl', ['$scope', 'ResourceService',
			function ($scope) {
				$scope.slider = {
					slide: function (left) {
						if (left) {
							$scope.$state.go('list');
						} else {
							$scope.$state.go('wall');
						}
					}
				};

				$scope.title = 'Map';
			}]);

}());