(function () {
	'use strict';

	var dependencies = [
		'ui.router',
		'LocalStorageModule',
		'ngMockE2E'
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
				$rootScope.$stateParams = $stateParams;
			}])

		.run(['$window',
			function ($window) {
				// handle vendor specific requestAnimationFrame functions
				$window.requestAnimationFrame =
					$window.requestAnimationFrame ||
					$window.mozRequestAnimationFrame ||
					$window.webkitRequestAnimationFrame ||
					$window.msRequestAnimationFrame;
			}])

		.run(['$httpBackend',
			function ($httpBackend) {
				var laureates = [
					{
						id: '53453',
						name: 'Anton Alpha',
						year: 2011,
						quote: '... for a lifetime of work for the human and environmental rights of indigenous people and for his tireless efforts to save the Amazon forest from desctruction ...'
					},
					{
						id: '92384',
						name: 'Berta Bravo',
						year: 2012,
						quote: '... for a lifetime of work for the human and environmental rights of indigenous people and for his tireless efforts to save the Amazon forest from desctruction ...'
					},
					{
						id: '21389',
						name: 'Cäsar Charlie',
						year: 2013,
						quote: '... for a lifetime of work for the human and environmental rights of indigenous people and for his tireless efforts to save the Amazon forest from desctruction ...'
					},
					{
						id: '67234',
						name: 'Dora Delta',
						year: 2014,
						quote: '... for a lifetime of work for the human and environmental rights of indigenous people and for his tireless efforts to save the Amazon forest from desctruction ...'
					},
					{
						id: '91238',
						name: 'Emil Echo',
						year: 2015,
						quote: '... for a lifetime of work for the human and environmental rights of indigenous people and for his tireless efforts to save the Amazon forest from desctruction ...'
					}
				];

				$httpBackend.whenGET(/\.tpl\.html$/).passThrough();

				$httpBackend.whenGET('/rest/version').respond('1.0');

				$httpBackend.whenGET('/rest/laureates').respond(laureates);
			}]);

}());