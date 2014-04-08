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

				this.isOfflineMode = function () {
					return !navigator.onLine;
				};

				this.isHorizontal = function (x, y) {
					return Math.abs(y) < Math.abs(x);
				};

				this.determineTransformKey = function determineTransformKey() {
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
				};

				this.splitTextIntoLines = function splitTextIntoLine(text, lineLength) {
					var parts = [],
						length;

					if (_.isArray(lineLength)) {
						length = lineLength.shift();
						while (splitting(length)) {
							if (lineLength.length > 0) {
								length = lineLength.shift();
							}
						}

					} else {
						while (splitting(lineLength)) {
							// nothing
						}
					}

					function splitting(max) {
						var i;

						if (text.length <= max) {
							return add();
						}

						for (i = max; i >= 0; i--) {
							if (text.charAt(i) === ' ') {
								return addPart(i);
							}
						}

						return add();
					}

					function add() {
						parts.push(text);
						return false;
					}

					function addPart(index) {
						parts.push(text.substring(0, index));
						text = text.substr(index + 1);
						return true;
					}

					return parts;
				};
			}]);
}());