/**
 * Created by Thomas on 05.04.2014.
 */
(function () {
	'use strict';

	angular.module('rla')

		.directive('tsScroller', ['$timeout', 'HelperService',
			function ($timeout, HelperService) {
				return {
					link: function ($scope, $elem, $attrs) {
						var $items = null,
							touchX = 0,
							touchY = 0,
							startX = 0,
							startY = 0,
							speedY = 0,
							timing = 0,
							minSpeed = 10,
							deltaSteps = 200,
							deltaMaxVisible = 50,
							deltaMinVisible = -425,
							deltaMax = null,
							deltaMin = null,
							deltaSum = null,
							animationId = null,
							transformKey = HelperService.determineTransformKey();

						$timeout(initialize);

						function initialize() {
							$items = $elem.find('.item');
							setupPositions();
						}

						function setupPositions() {
							var index;

							for (index = 0; index < $items.size(); index++) {
								$items[index].delta = (index - 1) * -deltaSteps;
							}

							calculations(0);
						}

						function calculations(speed) {
							var index;

							speedY = speed;
							deltaMax = deltaSteps;
							deltaMin = ($items.size() - 2) * -deltaSteps;
							deltaSum = $items.size() * deltaSteps;

							for (index = 0; index < $items.size(); index++) {
								calculateDelta(index);
							}
						}

						function calculateDelta(index) {
							var $item = $items[index];

							$item.delta = $item.delta + speedY;

							if ($item.delta > deltaMax) {
								$item.delta = $item.delta - deltaSum;
							} else if ($item.delta < deltaMin) {
								$item.delta = $item.delta + deltaSum;
							}

							if (Math.abs($item.delta) < 3 * deltaSteps) {
								calculateStatus($item);
								$item.style.visibility = 'visible';
							} else {
								$item.style.visibility = 'hidden';
							}
						}

						function calculateStatus($item) {
							var y = calculateY($item.delta),
								scale = calculateScale($item.delta),
								opacity = calculateOpacity($item.delta);

							$item.style[transformKey] = 'translateY(' + y + 'px) scale(' + scale + ')';
							$item.style.opacity = opacity;
							$item.style.zIndex = 10;
						}

						function calculateY(delta) {
//							return delta;
							return (Math.sqrt(-delta + deltaSteps) - Math.sqrt(deltaSteps)) * -20;
						}

						function calculateScale(delta) {
							var scale = delta / -deltaMinVisible + 1;

							if (scale < 0) {
								scale = 0;
							} else if (scale > 1) {
								scale = scale * scale;
							}

							return scale;
						}

						function calculateOpacity(delta) {
							var opacity = 1;

							if (delta === 0) {
								return opacity;
							}

							if (delta < 0) {
								opacity = 1 + ((delta + deltaSteps / 2) / (deltaSteps * 1.5));
							} else {
								opacity = 1 - (delta / deltaSteps);
							}

							return opacity > 1 ? 1 : opacity < 0 ? 0 : opacity;
						}

						$elem.on('touchstart', function (event) {
							var touch = event.originalEvent.touches[0];

							startX = touch.pageX;
							startY = touch.pageY;
						});

						$elem.on('touchmove', function (event) {
							var touch = event.originalEvent.touches[0];

							touchX = touch.pageX;
							touchY = touch.pageY;

							if (!HelperService.isHorizontal(touchX - startX, touchY - startY)) {
								calculations(touchY - startY);

								startX = touchX;
								startY = touchY;
							}
						});

						$elem.on('touchend', function (event) {
							calmDown();
						});

						function calmDown(time) {
							if (calm()) {
								speedY = 0;
								return;
							}

							adjustPositions();
							reduceSpeedY();

							animationId = requestAnimationFrame(calmDown, null);
						}

						function calm() {
							return Math.abs(speedY) <= minSpeed && getDelta() === 0;
						}

						function reduceSpeedY() {
							if (speedY < 0) {
								speedY = speedY + 1;
								speedY = speedY > -minSpeed ? -minSpeed : speedY;
							} else {
								speedY = speedY - 1;
								speedY = speedY < minSpeed ? minSpeed : speedY;
							}
						}

						function adjustPositions() {
							var delta = getDelta();

							if (Math.abs(speedY) <= minSpeed && Math.abs(delta) <= minSpeed) {
								if (speedY < 0) {
									speedY = -delta;
								} else {
									speedY = delta;
								}
							}

							calculations(speedY);
						}

						function getDelta() {
							var i, delta = deltaSum;

							for (i = 0; i < $items.size(); i++) {
								if (Math.abs($items[i].delta) < delta) {
									delta = Math.abs($items[i].delta);
								}
							}

							return delta;
						}

						$scope.$on('$destroy', function (event) {
							$elem.off('touchstart');
							$elem.off('touchmove');
							$elem.off('touchend');
						});
					}
				};
			}]);

}());