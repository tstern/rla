(function () {
	'use strict';

	angular.module('rla')

		.controller('InfoCtrl', ['$scope', 'ResourceService',
			function ($scope, ResourceService) {
				var laureateId = $scope.$stateParams.id;

				ResourceService.getLaureates().then(function (laureates) {
					var i;

					for (i = 0; i < laureates.length; i++) {
						if (laureates[i].id === laureateId) {
							$scope.laureate = laureates[i];
						}
					}

					checkIfLaureateExist();
				});

				function checkIfLaureateExist() {
					if (!$scope.laureate) {
						$scope.$state.go('notFound');
					}
				}
			}]);

}());