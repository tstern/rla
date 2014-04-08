/**
 * Created by Thomas on 07.04.2014.
 */
(function () {
	'use strict';

	describe('Service: HelperService', function () {

		var HelperService;

		beforeEach(module('rla'));

		beforeEach(inject(function ($injector) {
			HelperService = $injector.get('HelperService');
		}));

//		beforeEach(inject(function (HelperService) {
//			helperService = HelperService;
//		}));

		it('should not be undefined', function () {
			expect(HelperService).not.toBeUndefined();
		});

		describe('correctIndex(index, length)', function () {
			it('should not correct index if it is ">= 0" and "< length"', function () {
				expect(HelperService.correctIndex(0, 8)).toBe(0);
				expect(HelperService.correctIndex(5, 8)).toBe(5);
				expect(HelperService.correctIndex(7, 8)).toBe(7);
			});

			it('should correct an index if it is "< 0" to the last index', function () {
				expect(HelperService.correctIndex(-1, 3)).toBe(2);
				expect(HelperService.correctIndex(-2, 3)).toBe(2);
			});

			it('should correct an index if it is "> length - 1" to the first index', function () {
				expect(HelperService.correctIndex(8, 8)).toBe(0);
				expect(HelperService.correctIndex(9, 8)).toBe(0);
			});
		});

		describe('isHorizontal(deltaX, deltaY)', function () {
			it('should be horizontal when absolute value of deltaX is greater than absolute value of deltaY', function () {
				expect(HelperService.isHorizontal(2, -1)).toBe(true);
				expect(HelperService.isHorizontal(-2, 1)).toBe(true);
				expect(HelperService.isHorizontal(2, 1)).toBe(true);
			});

			it('should be vertical when absolute value of deltaX is lower than absolute value of deltaY', function () {
				expect(HelperService.isHorizontal(1, -2)).toBe(false);
				expect(HelperService.isHorizontal(-1, 2)).toBe(false);
				expect(HelperService.isHorizontal(1, 2)).toBe(false);
			});

			it('should be vertical when absolute value of delta is equal to absolute value of deltaY', function () {
				expect(HelperService.isHorizontal(-1, 1)).toBe(false);
				expect(HelperService.isHorizontal(1, -1)).toBe(false);
				expect(HelperService.isHorizontal(1, 1)).toBe(false);
			});
		});

		describe('splitTextIntoLines(text, lineLength)', function () {
			// 96 characters long text
			var text = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.';

			it('should split text into lines with a max length of 30', function () {
				var expectedArray = [
					'Lorem ipsum dolor sit amet,',
					'consetetur sadipscing elitr,',
					'sed diam nonumy eirmod tempor',
					'invidunt.'
				];

				expect(HelperService.splitTextIntoLines(text, 30)).toEqual(expectedArray);
			});

			it('should split text into lines with each has a different length', function () {
				var expectedArray = [
					'Lorem ipsum dolor sit amet, consetetur sadipscing',
					'elitr, sed diam nonumy',
					'eirmod tempor invidunt.'
				];

				expect(HelperService.splitTextIntoLines(text, [50, 25])).toEqual(expectedArray);
			});
		});
	});

}());