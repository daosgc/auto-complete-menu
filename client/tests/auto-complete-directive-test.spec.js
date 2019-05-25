(function () {
	'use strict';

	describe('autoCompleteMenu', function () {
		var $compile,
			$rootScope,
			$scope,
			template,
			controller,
			StateService,
			deferGetStates;

		beforeEach(module('app.directives'));
		beforeEach(module('app.services', function ($provide) {
			$provide.factory('StateService', function ($q) {
				deferGetStates = $q.defer();
				return {
					getStates: function () {
						return deferGetStates.promise;
					}
				};
			});
		}));
		beforeEach(inject(
			function (_$compile_,
					_$rootScope_,
					_StateService_) {
				$compile = _$compile_;
				$rootScope = _$rootScope_;
        		$scope = $rootScope.$new();
				StateService = _StateService_;
			})
		);
		beforeEach(function(){
			$scope.autoCompleteOptions = {
				label: 'States of EEUU',
				callbacks: {
					onSelectItem: function(){},
					onClearItem: function(){}
				}
			};
		  });


		describe('#autoCompleteMenu init', function () {

			it('the autoCompleteMenu should have all the options defined', function () {
				template = $compile('<auto-complete-menu class="auto-complete" options="autoCompleteOptions"></auto-complete-menu>')($scope);
				$scope.$digest();
				controller = template.controller('autoCompleteMenu');
				var defaultPlaceholder = 'Search states';
				expect(controller.options.label).toContain('EEUU');
				expect(controller.placeholder).toEqual(defaultPlaceholder);
			});

		});

		describe('#autoCompleteMenu methods', function () {

			it('should search states when you write more than two characters', function () {
				template = $compile('<auto-complete-menu class="auto-complete" options="autoCompleteOptions"></auto-complete-menu>')($scope);
				controller = template.controller('autoCompleteMenu');
				var mockData = {
					data: [
						{
							'name': 'California',
							'abbreviation': 'CA'
						}
					]
				};
				controller.itemSearch = 'ca';
				//force search function with 'ca' as search item
				controller.onSearch();
				deferGetStates.resolve(mockData);
				$scope.$digest();
				expect(controller.filteredItems).toEqual(mockData.data)
			});

			it('should change current search term when you press arrow down key', function () {
				template = $compile('<auto-complete-menu class="auto-complete" options="autoCompleteOptions"></auto-complete-menu>')($scope);
				controller = template.controller('autoCompleteMenu');
				var mockData = {
					data: [
						{
							'name': 'California',
							'abbreviation': 'CA'
						}
					]
				};
				var keyDown = {keyCode: 40}; //event for arrow down key
				controller.itemSearch = 'ca';
				//force search function with 'ca' as search item
				controller.onSearch();
				deferGetStates.resolve(mockData);
				$scope.$digest();
				//force keyPress when user press arrow down key
				controller.onKeyDown(keyDown);
				expect(controller.itemSearch).toEqual(mockData.data[0].name);
			});

			it('should clear current search term when you press clear button', function () {
				template = $compile('<auto-complete-menu class="auto-complete" options="autoCompleteOptions"></auto-complete-menu>')($scope);
				controller = template.controller('autoCompleteMenu');
				var mockData = {
					data: [
						{
							'name': 'California',
							'abbreviation': 'CA'
						}
					]
				};
				controller.itemSearch = 'ca';
				//force search function with 'ca' as search item
				controller.onSearch();
				deferGetStates.resolve(mockData);
				$scope.$digest();
				controller.onClearSearch();
				expect(controller.itemSearch).toEqual('');
				expect(controller.filteredItems).toEqual([]);
			});

			it('should reset init values when you press enter', function () {
				template = $compile('<auto-complete-menu class="auto-complete" options="autoCompleteOptions"></auto-complete-menu>')($scope);
				controller = template.controller('autoCompleteMenu');
				var mockData = {
					data: [
						{
							'name': 'California',
							'abbreviation': 'CA'
						}
					]
				};
				var keyEnter = {keyCode: 13}; //event for enter key
				var keyDown = {keyCode: 40}; //event for arrow down key
				controller.itemSearch = 'ca';
				//force search function with 'ca' as search item
				controller.onSearch();
				deferGetStates.resolve(mockData);
				$scope.$digest();
				//force keyPress when user press arrow down key
				controller.onKeyDown(keyDown);
				//force keyPress when user press enter key
				controller.onKeyDown(keyEnter);
				expect(controller.itemSearch).toEqual('California');
				expect(controller.filteredItems).toEqual([]);
			});
		});

	});
})();
