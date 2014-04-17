/**
 * Created by Thomas on 17.04.2014.
 */
(function () {
	'use strict';

	angular.module('rla')

		.directive('tsMapZoom', [
			function () {
				return {
					link: function ($scope, $elem, $attrs) {
						var widthSpace = 1024 / 2,
							minWidthSpace = Math.floor(widthSpace - (widthSpace / 10)),
							heightSpace = 768 / 2,
							minHeightSpace = Math.floor(heightSpace - (heightSpace / 10)),
							zoomFactor = $attrs.tsMapZoom,
							zoomed = false;

						prepare();

						function prepare() {
							$elem.css({
								'-webkit-transition': '-webkit-transform 0.5s',
								'transition': 'transform 0.5s'
							});
						}

						$elem.on('click', function (event) {
							var x, y;

							if (zoomed) {
								zoomOut();
							} else {
								x = correctX(-event.clientX + widthSpace);
								y = correctY(-event.clientY + heightSpace);
								zoomIn(x, y);
							}
						});

						function zoomOut() {
							$elem.css({
								'-webkit-transform': '',
								'transform': ''
							});

							zoomed = false;
						}

						function zoomIn(x, y) {
							var transform = 'scale(' + zoomFactor + ') translate(' + x + 'px, ' + y + 'px)';

							$elem.css({
								'-webkit-transform': transform,
								'transform': transform
							});

							zoomed = true;
						}

						function correctX(x) {
							if (x < -minWidthSpace) {
								return -minWidthSpace;
							}

							if (x > minWidthSpace) {
								return minWidthSpace;
							}

							return x;
						}

						function correctY(y) {
							if (y < -minHeightSpace) {
								return -minHeightSpace;
							}

							if (y > minHeightSpace) {
								return minHeightSpace;
							}

							return y;
						}

						$scope.$on('$destroy', function (event) {
							$elem.off('click');
						});
					}
				}
			}]);
}());