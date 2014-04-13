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
						laureateId: laureate.id,
						name: laureate.name,
						year: laureate.year,
						country: laureate.country,
						quote: laureate.quote,
						image: laureate.image.code,
						width: laureate.image.width,
						height: laureate.image.height
					};
				}
			}]);

}());