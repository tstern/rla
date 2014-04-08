(function () {
	'use strict';

	var dependencies = [
		'ui.router',
		'LocalStorageModule'
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
						url: '/info/:id',
						name: 'info',
						templateUrl: 'views/info.tpl.html',
						controller: 'InfoCtrl'
					},
					notFound = {
						url: '/404',
						name: 'notFound',
						templateUrl: 'views/404.tpl.html'
					};

				// redirecting
				$urlRouterProvider.when('', list.url);
				$urlRouterProvider.when('/', list.url);
				$urlRouterProvider.otherwise(notFound.url);

				// register all state objects
				$stateProvider.state(list);
				$stateProvider.state(wall);
				$stateProvider.state(map);
				$stateProvider.state(info);
				$stateProvider.state(notFound);
			}])

		.run(['$rootScope', '$state', '$stateParams',
			function ($rootScope, $state, $stateParams) {
				// provide app-wide access to $state and $stateParams
				$rootScope.$state = $state;
				$rootScope.$stateParams = $stateParams;

				// store previous $state name on $stateChange
				$rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
					$rootScope.previousStateName = from.name;
				});
			}])

		.run(['$window',
			function ($window) {
				// handle vendor specific requestAnimationFrame functions
				$window.requestAnimationFrame =
					$window.requestAnimationFrame ||
					$window.mozRequestAnimationFrame ||
					$window.webkitRequestAnimationFrame ||
					$window.msRequestAnimationFrame;
			}]);

}());