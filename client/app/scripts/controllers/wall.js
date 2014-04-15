(function () {
	'use strict';

	angular.module('rla')

		.controller('WallCtrl', ['$scope', 'ResourceService', 'HelperService',
			function ($scope, ResourceService, HelperService) {
				$scope.neighbours = {
					left: 'list',
					right: 'map'
				};

				$scope.images = extractImages();

				function extractImages() {
					var images = [];

					$scope.laureates.forEach(function (laureate) {
						images.push(extractImage(laureate));
					});

					images = HelperService.groupImagesByHeight(images);
					images = HelperService.reorderImages(images, 1800);

					return images;
				}

				function extractImage(laureate) {
					return {
						id: laureate.id,
						title: laureate.firstname + ' ' + laureate.lastname,
						subtitle: laureate.country + ', ' + laureate.year,
						citation: laureate.citation,
						filename: laureate.picture,
						width: laureate.pictureWidth,
						height: laureate.pictureHeight
					}
				}
			}]);

}());