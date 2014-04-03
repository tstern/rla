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

		.run(['$httpBackend',
			function ($httpBackend) {
				var laureates = [
					{
						id: '53453',
						name: 'Anna Alpha',
						quote: 'Wenn 50 Millionen Menschen etwas Dummes sagen, bleibt es trotzdem eine Dummheit.'
					},
					{
						id: '92384',
						name: 'Bob Bravo',
						quote: 'Was dein Feind nicht wissen soll, das sage deinem Freunde nicht.'
					},
					{
						id: '21389',
						name: 'Chris Charlie',
						quote: 'Alter ist irrelevant, es sei denn, du bist eine Flasche Wein.'
					},
					{
						id: '67234',
						name: 'Donnie Delta',
						quote: 'Man löst keine Probleme, indem man sie auf Eis legt.'
					},
					{
						id: '91238',
						name: 'Erik Echo',
						quote: 'Probleme kann man niemals mit derselben Denkweise lösen, durch die sie entstanden sind.'
					}
				];

				$httpBackend.whenGET(/\.tpl\.html$/).passThrough();

				$httpBackend.whenGET('/rest/version').respond('1.0');

				$httpBackend.whenGET('/rest/laureates').respond(laureates);
			}]);

}());