/**
 * Created by Thomas on 17.04.2014.
 */
(function () {
	'use strict';

	angular.module('rla')

		.controller('NavCtrl', ['$rootScope', '$scope',
			function ($rootScope, $scope) {
				var previousStateName = 'list',
					navigator = {
						list: function (to, toParams, from, fromParams) {
							return {
								east: {
									name: 'wall',
									params: {},
									text: 'next'
								},
								west: {
									name: 'map',
									params: {},
									text: 'prev'
								}
							}
						},

						wall: function (to, toParams, from, fromParams) {
							return {
								east: {
									name: 'map',
									params: {},
									text: 'next'
								},
								west: {
									name: 'list',
									params: {},
									text: 'prev'
								}
							};
						},

						map: function (to, toParams, from, fromParams) {
							return {
								east: {
									name: 'list',
									params: {},
									text: 'next'
								},
								west: {
									name: 'wall',
									params: {},
									text: 'prev'
								}
							};
						},

						info: function (to, toParams, from, fromParams) {
							var name = getPreviousStateName(from),
								id = getIdOfNextLaureate(toParams.id);

							return {
								east: {
									name: 'info',
									params: {
										id: id
									},
									text: 'next laureate'
								},
								west: {
									name: name,
									params: fromParams || {},
									text: 'back to ' + name
								}
							}
						}
					};

				if (!$rootScope.navigator) {
					$rootScope.navigator = navigator[$scope.$state.current.name]($scope.$state.current.name, $scope.$state.params);
				}

				$rootScope.$on('$stateChangeSuccess', function (event, to, toParams, from, fromParams) {
					$rootScope.navigator = navigator[to.name](to, toParams, from, fromParams);
				});

				function getPreviousStateName(previousState) {
					if (previousState && previousState.name !== 'info') {
						previousStateName = previousState.name;
					}

					return previousStateName;
				}

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