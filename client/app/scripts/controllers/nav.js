/**
 * Created by Thomas on 17.04.2014.
 */
(function () {
	'use strict';

	angular.module('rla')

		.controller('NavCtrl', ['$rootScope', '$scope',
			function ($rootScope, $scope) {
				var navigator = {
					list: function (to, toParams, from, fromParams) {
						return {
							east: {
								name: 'wall',
								params: {}
							},
							west: {
								name: 'map',
								params: {}
							}
						}
					},

					wall: function (to, toParams, from, fromParams) {
						return {
							east: {
								name: 'map',
								params: {}
							},
							west: {
								name: 'list',
								params: {}
							}
						};
					},

					map: function (to, toParams, from, fromParams) {
						return {
							east: {
								name: 'list',
								params: {}
							},
							west: {
								name: 'wall',
								params: {}
							}
						};
					},

					info: function (to, toParams, from, fromParams) {
						var id = getIdOfNextLaureate(toParams.id);

						return {
							east: {
								name: 'info',
								params: {
									id: id
								}
							},
							west: {
								name: from ? from.name : 'list',
								params: fromParams || {}
							}
						}
					}
				};

				if (!$rootScope.navigator) {
					$rootScope.navigator = navigator[$scope.$state.current.name]($scope.$state.current.name, $scope.$state.params);
				}

				// store previous $state name on $stateChange
				$rootScope.$on('$stateChangeSuccess', function (event, to, toParams, from, fromParams) {
					$rootScope.navigator = navigator[to.name](to, toParams, from, fromParams);
				});

				function getIdOfNextLaureate(id) {
					var index;

					for (index = 0; index < $scope.laureates.length; index++) {
						if ($scope.laureates[index].id === parseInt(id, 10)) {
							index = index + 1;
							if (index === $scope.laureates.length) {
								index = 0;
							}
							return $scope.laureates[index].id;
						}
					}
				}
			}]);
}());