(function () {
	'use strict';

	angular.module('rla')

		.controller('ListCtrl', ['$scope', 'ResourceService',
			function ($scope, ResourceService) {
				$scope.title = 'List';


			}]);

}());