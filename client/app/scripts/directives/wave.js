/**
 * Created by Thomas on 16.04.2014.
 */
(function () {
	'use strict';

	angular.module('rla')

		.directive('tsWave', ['$timeout',
			function ($timeout) {
				return {
					link: function ($scope, $elem, $attrs) {
						var stripeWidth = 8,
							frameWidth = 1024;

						createWaves();

						function createWaves() {
							var i, $wave;

							for (i = 0; i < frameWidth; i = i + stripeWidth) {
								$wave = createWave(i);
								$elem.append($wave);
							}

							$elem.addClass('ocean');
						}

						function createWave(delta) {
							var $wave = $('<div></div>'),
								delay = delta * 1.25 + 'ms';

							$wave.addClass('wave animate');
							$wave.css({
								'left': delta + 'px',
								'animation-delay': delay,
								'-webkit-animation-delay': delay
							});

							$wave.get(0).addEventListener('webkitAnimationEnd', function (event) {
								$wave.remove();
							}, false);

							return $wave;
						}
					}
				}
			}]);
}());