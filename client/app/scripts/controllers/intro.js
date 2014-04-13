/**
 * Created by Thomas on 12.04.2014.
 */
(function () {
	'use strict';

	angular.module('rla')

		.controller('IntroCtrl', ['$rootScope', '$scope', '$timeout', 'ResourceService',
			function ($rootScope, $scope, $timeout, ResourceService) {
				var fadeOutTime = 1000; // ms

				$scope.intro = {
					title: 'Right Livelihood Award',
					messages: [
						{
							text: 'Welcome to the Right Livelihood Award.',
							type: 'info'
						}
					]
				};

				$rootScope.$on('laureates:loaded', function (event, laureates) {
					$scope.loaded = true;
					$scope.intro.messages.push({
						text: 'Starting the application ...',
						type: 'info'
					});

					$timeout(function () {
						$rootScope.laureates = laureates;
					}, fadeOutTime);
				});

				$rootScope.$on('laureates:notify', function (event, message) {
					$scope.intro.messages.push({
						text: message,
						type: 'info'
					})
				});

				$rootScope.$on('laureates:error', function (event, message) {
					$scope.intro.messages.push({
						text: message,
						type: 'error'
					})
				});

				ResourceService.loadLaureates();
			}]);
}());