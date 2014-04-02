(function () {
	'use strict';

	var dependencies = [
		'ui.router',
		'rla.services'
	];

	angular.module('rla', dependencies)

		.config(['$stateProvider', '$urlRouterProvider',
			function ($stateProvider, $urlRouterProvider) {
				var list = {
						url: '/list',
						name: 'list',
						templateUrl: 'views/list.tpl.html',
						controller: 'ListCtrl'
					},
					wall = {
						url: '/wall',
						name: 'wall',
						templateUrl: 'views/wall.tpl.html',
						controller: 'WallCtrl'
					},
					map = {
						url: '/map',
						name: 'map',
						templateUrl: 'views/map.tpl.html',
						controller: 'MapCtrl'
					},
					info = {
						url: '/info',
						name: 'info',
						templateUrl: 'views/info.tpl.html',
						controller: 'InfoCtrl'
					};

				// default route
				$urlRouterProvider.otherwise('/list');

				// register all state objects
				$stateProvider.state(list);
				$stateProvider.state(wall);
				$stateProvider.state(map);
				$stateProvider.state(info);
			}])

		.run(['$rootScope', '$state', '$stateParams',
			function ($rootScope, $state, $stateParams) {
				// provide app-wide access to $state and $stateParams
				$rootScope.$state = $state;
				$rootScope.$rootScope = $rootScope;
			}]);

}());