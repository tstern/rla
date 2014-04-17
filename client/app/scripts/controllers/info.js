(function () {
	'use strict';

	angular.module('rla')

		.controller('InfoCtrl', ['$scope', '$sce',
			function ($scope, $sce) {
				var id = $scope.$stateParams.id;

				initialize();

				function initialize() {
					$scope.laureate = getLaureate(id);

					if ($scope.laureate !== null) {
						$scope.biography = $sce.trustAsHtml($scope.laureate.biography);
					} else {
						$scope.$state.go('notFound');
					}
				}

				function getLaureate(id) {
					var i;

					for (i = 0; i < $scope.laureates.length; i++) {
						if ($scope.laureates[i].id === parseInt(id, 10)) {
							return $scope.laureates[i];
						}
					}

					return null;
				}
			}]);

}());