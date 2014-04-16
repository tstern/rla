(function () {
	'use strict';

	angular.module('rla')

		.controller('InfoCtrl', ['$scope', '$sce',
			function ($scope, $sce) {
				var laureateId = $scope.$stateParams.id;

				initialize();

				function initialize() {
					var index = getIndexOfLaureate(laureateId);

					if (index !== null) {
						$scope.laureate = $scope.laureates[index];
						$scope.biography = $sce.trustAsHtml($scope.laureate.biography);
						setupSlider(index + 1);
					} else {
						$scope.$state.go('notFound');
					}
				}

				function getIndexOfLaureate(id) {
					var i;

					for (i = 0; i < $scope.laureates.length; i++) {
						if ($scope.laureates[i].id === parseInt(id, 10)) {
							return i;
						}
					}

					return null;
				}

				function setupSlider(i) {
					var index = i === $scope.laureates.length ? 0 : i,
						id = $scope.laureates[index].id;

					$scope.slider = {
						slide: function (left) {
							if (left) {
								$scope.$state.go('info', { id: id });
							} else {
								$scope.$state.go($scope.previousStateName, $scope.previousStateParams);
							}
						}
					};
				}
			}]);

}());