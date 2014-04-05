(function () {
	'use strict';

	angular.module('rla')

		.controller('ListCtrl', ['$scope', 'ResourceService',
			function ($scope, ResourceService) {
				ResourceService.getLaureates().then(function (laureates) {
					$scope.laureates = prepareLaureates(laureates);
				});

				function prepareLaureates(laureates) {
					laureates.forEach(function (laureate) {
						laureate.quote = splitQuote(laureate.quote);
					});
					return laureates;
				}

				function splitQuote(quote) {
					var parts = [],
						max = 45;

					while (splitting(max)) {
						max = 55;
					}

					function splitting(max) {
						var i;

						if (quote.length <= max) {
							return add();
						}

						for (i = max; i >= 0; i--) {
							if (quote.charAt(i) === ' ') {
								return addPart(i);
							}
						}

						return add();
					}

					function add() {
						parts.push(quote);
						return false;
					}

					function addPart(index) {
						parts.push(quote.substring(0, index));
						quote = quote.substr(index + 1);
						return true;
					}

					return parts;
				}
			}]);

}());