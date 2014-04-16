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
							frameWidth = 1024,
							$waves = [];

						createWaves();
						initWaves();

						function createWaves() {
							var i, $wave;

							for (i = 0; i < frameWidth; i = i + stripeWidth) {
								$wave = createWave(i);
								$waves.push($wave);
								$elem.append($wave);
							}

							$elem.addClass('ocean');
						}

						function createWave(delta) {
							var $wave = $('<div></div>');

							$wave.addClass('wave');
							$wave.css({
								'left': delta + 'px'
							});

							$wave.get(0).addEventListener('webkitAnimationEnd', function (event) {
								$wave.remove();
							}, false);

							return $wave;
						}

						function initWaves() {
							var i;

							for (i = 0; i < $waves.length; i++) {
								initWave(i);
							}
						}

						function initWave(i) {
							var $wave = $waves[i],
								delay = i * 10;

							$timeout(function () {
								$wave.addClass('animate');
							}, delay);
						}
					}
				}
			}]);
}());