(function () {
	'use strict';

	angular.module('rla')

		.controller('InfoCtrl', ['$scope', 'ResourceService',
			function ($scope, ResourceService) {
				$scope.title = 'Info';
			}]);

}());