(function () {
	'use strict';

	angular.module('rla')

		.controller('ListCtrl', ['$scope', '$timeout', 'ResourceService', 'HelperService',
			function ($scope, $timeout, ResourceService, HelperService) {
				ResourceService.getLaureates().then(function (laureates) {
					$scope.laureates = prepareLaureates(laureates);
					$timeout(function () {
						$scope.$broadcast('laureates:loaded');
					});
				});

				function prepareLaureates(laureates) {
					laureates.forEach(function (laureate) {
						if (!laureate.splittedQuote) {
							laureate.splittedQuote = HelperService.splitTextIntoLines(laureate.quote, [50, 65])
						}
					});
					return laureates;
				}
			}]);

}());