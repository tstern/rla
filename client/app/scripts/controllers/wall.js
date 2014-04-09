(function () {
	'use strict';

	angular.module('rla')

		.controller('WallCtrl', ['$scope', 'ResourceService', 'HelperService',
			function ($scope, ResourceService, HelperService) {
				$scope.laureates = null;

				$scope.neighbours = {
					left: 'list',
					right: 'map'
				};

				var images = HelperService.groupImagesByHeight(getImages());
				images = HelperService.reorderImages(images, 2 * 924);

				$scope.images = images;
			}]);

	function getImages() {
		return [
			{
				name: 'ahalf',
				width: 400,
				height: 500,
				laureateId: 1
			},
			{
				name: 'ambasi',
				width: 400,
				height: 500,
				laureateId: 1
			},
			{
				name: 'aware',
				width: 400,
				height: 800,
				laureateId: 1
			},
			{
				name: 'dkolkov',
				width: 400,
				height: 400,
				laureateId: 1
			},
			{
				name: 'dsuzuki',
				width: 400,
				height: 700,
				laureateId: 1
			},
			{
				name: 'ekraeutler',
				width: 690,
				height: 600,
				laureateId: 1
			},
			{
				name: 'gasamoah',
				width: 400,
				height: 400,
				laureateId: 1
			},
			{
				name: 'gcan',
				width: 400,
				height: 300,
				laureateId: 1
			},
			{
				name: 'gsommer',
				width: 400,
				height: 500,
				laureateId: 1
			},
			{
				name: 'jseven',
				width: 400,
				height: 300,
				laureateId: 1
			},
			{
				name: 'jterry',
				width: 400,
				height: 500,
				laureateId: 1
			},
			{
				name: 'ksmith',
				width: 700,
				height: 600,
				laureateId: 1
			},
			{
				name: 'ldurant',
				width: 400,
				height: 700,
				laureateId: 1
			},
			{
				name: 'mburns',
				width: 400,
				height: 700,
				laureateId: 1
			},
			{
				name: 'nbassey',
				width: 678,
				height: 600,
				laureateId: 1
			},
			{
				name: 'oshiru',
				width: 400,
				height: 500,
				laureateId: 1
			},
			{
				name: 'pcouch',
				width: 700,
				height: 600,
				laureateId: 1
			},
			{
				name: 'pwalker',
				width: 572,
				height: 600,
				laureateId: 1
			},
			{
				name: 'rbrenner',
				width: 400,
				height: 400,
				laureateId: 1
			},
			{
				name: 'rngongo',
				width: 400,
				height: 300,
				laureateId: 1
			},
			{
				name: 'saydhpa',
				width: 616,
				height: 600,
				laureateId: 1
			},
			{
				name: 'supadhyay',
				width: 666,
				height: 600,
				laureateId: 1
			},
			{
				name: 'ttonga',
				width: 400,
				height: 300,
				laureateId: 1
			}
		];
	}

}());