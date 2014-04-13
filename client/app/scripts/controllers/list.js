(function () {
	'use strict';

	angular.module('rla')

		.controller('ListCtrl', ['$scope', '$timeout', 'ResourceService', 'HelperService',
			function ($scope, $timeout, ResourceService, HelperService) {
				$scope.neighbours = {
					left: 'map',
					right: 'wall'
				};

				splitQuotes();

				function splitQuotes() {
					$scope.laureates.forEach(function (laureate) {
						if (!laureate.splittedQuote) {
							laureate.splittedQuote = HelperService.splitTextIntoLines(laureate.quote, [50, 65]);
						}
					});
				}
			}]);

}());