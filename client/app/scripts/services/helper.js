/**
 * Created by Thomas on 05.04.2014.
 */
(function () {
	'use strict';

	angular.module('rla')

		.service('HelperService', [
			function () {
				this.correctIndex = function correctIndex(index, length) {
					if (index < 0) {
						return length - 1;
					} else if (index < length) {
						return index;
					} else {
						return 0;
					}
				};

				this.determineTransformKey = function () {
					var index,
						keys = [
							'transform',
							'webkitTransform',
							'MozTransform',
							'msTransform',
							'OTransform'
						];

					for (index = 0; index < keys.length; index++) {
						if (keys[index] in document.body.style) {
							return keys[index];
						}
					}

					throw new Error('Not supported Browser.');
				}
			}]);
}());