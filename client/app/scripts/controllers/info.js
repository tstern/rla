(function () {
	'use strict';

	angular.module('rla')

		.controller('InfoCtrl', ['$scope', 'ResourceService',
			function ($scope, ResourceService) {
				var laureateId = $scope.$stateParams.id;

				$scope.neighbours = {
					left: 'map',
					right: 'list'
				};

//				$scope.laureate = null;
				$scope.laureate = {
					name: 'Amy Goodman',
					year: 2008,
					country: 'USA',
					quote: '... for developing an innovative model of truly indepedent political journalism that brings to millions of people the alternative voices that are often excluded by mainstream media.',
					description: 'The media is sometimes called the fourth estate in a democracy. But in many countries of the world, the media is today no longer willing or able to play this role. Instead it defers to commercial and political interests, thus eroding democracy. With Democracy Now!, Amy Goodman has shown what the alternative to this dangerous trend can look like. Democracy Now! is the largest public media collaboration in the U.S. which is now available to people seeking alternative viewpoints around the globe.',
					paragraphs: [
						{
							title: 'Career',
							text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
						},
						{
							title: 'Working for a chemical weapon free world',
							text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
						},
						{
							title: 'Promoting environmentally sound pathways for the actual physical destruction of chemical weapons',
							text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
						},
						{
							title: 'A role model for the elimination of all weapons of mass destruction',
							text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
						},
						{
							title: 'Honours',
							text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
						}
					],
					links: [
						'http://www.rightlivelihood.org/?id=1',
						'http://www.rightlivelihood.org/?id=2',
						'http://www.rightlivelihood.org/?id=3',
						'http://www.rightlivelihood.org/?id=4',
						'http://www.rightlivelihood.org/?id=5'
					]
				};

				ResourceService.getLaureates().then(function (laureates) {
					var i;

					for (i = 0; i < laureates.length; i++) {
						if (laureates[i].id === laureateId) {
//							$scope.laureate = laureates[i];
						}
					}

					checkIfLaureateExist();
				});

				function checkIfLaureateExist() {
					if ($scope.laureate === null) {
						$scope.$state.go('notFound');
					}
				}
			}]);

}());