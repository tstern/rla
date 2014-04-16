(function () {
	'use strict';

	angular.module('rla')

		.controller('ListCtrl', ['$scope', '$timeout', 'ResourceService', 'HelperService',
			function ($scope, $timeout, ResourceService, HelperService) {
				$scope.slider = {
					slide: function (left) {
						if (left) {
							$scope.$state.go('wall');
						} else {
							$scope.$state.go('map');
						}
					}
				};

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