/**
 * Created by Thomas on 09.04.2014.
 */
(function () {

	angular.module('rla')

		.directive('tsWallImage', ['$rootScope', 'HelperService',
			function ($rootScope, HelperService) {
				return {
					link: function ($scope, $elem, $attrs) {
						var active = false,
							element = $elem.get(0),
							$quote = $elem.find('.quote'),
							listName = $attrs.tsWallImage,
							image = $scope[listName][$scope.$index],
							transformKey = HelperService.determineTransformKey();

						setupStyles();

						function setupStyles() {
							element.style.zIndex = $scope.$index + 10;
							$quote.hide();

							if (image.first) {
								element.style.marginLeft = image.space + 'px';
							}

							if (image.small) {
								calculateTopAndBottomSpace(300);
							}

							if (image.medium) {
								calculateTopAndBottomSpace(400);
							}

							if (image.large) {
								calculateTopAndBottomSpace(550);
							}

							function calculateTopAndBottomSpace(minHeight) {
								var margin = ((image.height - minHeight) / -4) + 'px';

								element.style.marginTop = margin;
								element.style.marginBottom = margin;
							}
						}

						$elem.find('img').on('click', function (event) {
							onImageClick();
						});

						$rootScope.$on('images:deactivate', function (event, $index) {
							if ($index !== $scope.$index) {
								deactivateImage();
							}
						});

						function onImageClick() {
							deactivateAllImages();

							if (!active) {
								activateImage();
							} else {
								deactivateImage();
							}
						}

						function activateImage() {
							active = true;
							element.style[transformKey] = 'scale(2) ' + correctPosition();
							element.style.boxShadow = '0px 0px 20px 5px #007dbf';
							element.style.zIndex = $scope[listName].length + 10;
							$quote.show();
						}

						function correctPosition() {
							var x = 0,
								y = 0,
								top = element.offsetTop,
								left = element.offsetLeft,
								width = element.offsetWidth / 2,
								height = element.offsetHeight / 2;

							if (top < height) {
								y = height;
							}

							if (left < width) {
								x = width;
							} else if (left + width > 800) {
								x = -width;
							}

							return 'translate(' + x + 'px, ' + y + 'px)';
						}

						function deactivateImage() {
							active = false;
							element.style[transformKey] = '';
							element.style.boxShadow = '';
							element.style.zIndex = $scope.$index + 10;
							$quote.hide();
						}

						function deactivateAllImages() {
							$rootScope.$emit('images:deactivate', $scope.$index);
						}

						$scope.$on('$destroy', function (event) {
							$elem.off('click');
						});
					}
				};
			}]);
}());