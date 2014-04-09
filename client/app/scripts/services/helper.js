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

				this.groupImagesByHeight = function groupImagesByHeight(images) {
					var s = 300,
						m = 400,
						l = 550,
						xl = 700,
						groups = {
							small: [],
							medium: [],
							large: [],
							ignore: []
						};

					images.forEach(function (image) {
						if (image.height < s || image.height > xl) {
							groups.ignore.push(image);
						} else if (image.height < m) {
							groups.small.push(image);
						} else if (image.height < l) {
							groups.medium.push(image);
						} else {
							groups.large.push(image);
						}
					});

					return groups;
				};

				this.reorderImages = function reorderImages(imageGroup, maxWidth) {
					var images = [],
						random = Math.random(),
						key = random < 0.33 ? 'small' : random < 0.66 ? 'medium' : 'large';

					while (hasImages()) {
						randomReverse();
						extractImages();
						changeKey();
					}

					function hasImages() {
						var hasSmallImages = imageGroup.small.length > 0,
							hasMediumImages = imageGroup.medium.length > 0,
							hasLargeImages = imageGroup.large.length > 0;

						return hasSmallImages || hasMediumImages || hasLargeImages;
					}

					function randomReverse() {
						if (Math.random() > 0.5) {
							imageGroup[key] = imageGroup[key].reverse();
						}
					}

					function extractImages() {
						var image,
							firstImage,
							width = 0;

						while (extractable()) {
							extractImage();
						}
						setupFirstImage();
						setupLastImage();

						function extractable() {
							return imageGroup[key].length > 0 && imageGroup[key][0].width + width < maxWidth;
						}

						function extractImage() {
							image = imageGroup[key].shift();
							firstImage = firstImage ? firstImage : image;
							image[key] = true;
							width = width + image.width;
							images.push(image);
						}

						function setupFirstImage() {
							if (firstImage) {
								firstImage.first = true;
								firstImage.space = (maxWidth - width) / 4;
							}
						}

						function setupLastImage() {
							if (image) {
								image.last = true;
							}
						}
					}

					function changeKey() {
						if (key === 'small') {
							key = 'medium';
						} else if (key === 'medium') {
							key = 'large';
						} else {
							key = 'small';
						}
					}

					return images;
				};
			}]);
}());