(function () {
	'use strict';

	angular.module('rla')

		.controller('ListCtrl', ['$scope', '$timeout', 'ResourceService', 'HelperService',
			function ($scope, $timeout, ResourceService, HelperService) {

				splitQuotes();

				function splitQuotes() {
					$scope.laureates.forEach(function (laureate) {
						if (!laureate.splittedCitation) {
							laureate.splittedCitation = HelperService.splitTextIntoLines(laureate.citation, [50, 65]);
						}
					});
				}
			}]);

}());