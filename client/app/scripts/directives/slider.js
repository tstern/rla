/**
 * Created by Thomas on 08.04.2014.
 */
(function () {
	'use strict';

	angular.module('rla')

		.directive('tsSlider', ['HelperService',
			function (HelperService) {
				return {
					link: function ($scope, $elem, $attrs) {
						var transformKey = HelperService.determineTransformKey(),
							animation = false,
							timing = 0,
							startX = 0,
							startY = 0,
							touchX = 0,
							touchY = 0,
							deltaX = 0,
							deltaY = 0,
							slideTime = 250,
							slideStep = 250 / 100;

						$elem.on('touchstart', function (event) {
							var touch = event.originalEvent.touches[0];

							if (animation) {
								return;
							}

							timing = Date.now();
							startX = touch.pageX;
							startY = touch.pageY;
						});

						$elem.on('touchmove', function (event) {
							var touch = event.originalEvent.touches[0];

							if (animation) {
								return;
							}

							deltaX = touchX - startX;
							deltaY = touchY - startY;

							if (HelperService.isHorizontal(deltaX, deltaY) && timing + slideTime > Date.now()) {
								event.stopPropagation();
								event.preventDefault();
							}

							touchX = touch.pageX;
							touchY = touch.pageY;
						});

						$elem.on('touchend', function (event) {
							if (animation || !$scope.navigator || Math.abs(deltaX) < 100) {
								return;
							}

							timing = Date.now() - timing;

							if (timing < 500 && HelperService.isHorizontal(deltaX, deltaY)) {
								timing = Date.now();
								animation = true;
								slide();
							}
						});

						function slide() {
							var left = deltaX < 0,
								time = Date.now() - timing,
								step = time / slideStep;

							if (left) {
								step = -step;
							}

							$elem.get(0).style[transformKey] = 'translateX(' + step + '%)';

							if (time < slideTime) {
								requestAnimationFrame(slide, null);
							} else {
								if (left) {
									$scope.$state.go($scope.navigator.east.name, $scope.navigator.east.params);
								} else {
									$scope.$state.go($scope.navigator.west.name, $scope.navigator.west.params);
								}
							}
						}

						$scope.$on('$destroy', function (event) {
							$elem.off('touchstart');
							$elem.off('touchmove');
							$elem.off('touchend');
						});
					}
				}
			}]);

}());