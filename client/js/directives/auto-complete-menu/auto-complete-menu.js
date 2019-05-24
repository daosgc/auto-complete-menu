(function () {
	'use strict';

	angular
		.module('app.directives')
		.directive('autoCompleteMenu', autoCompleteMenuDirective);

	function autoCompleteMenuDirective() {
		return {
			restrict: 'EA',
			template: require('./auto-complete-menu.html'),
			scope: {
				options: '=',
			},
			controller: autoCompleteMenuController,
			controllerAs: 'vmAutoCompleteMenu',
			bindToController: true
		};
	}

	function autoCompleteMenuController(StateService) {
		var vmAutoCompleteMenu = this;

		function init() {
			vmAutoCompleteMenu.options = vmAutoCompleteMenu.options || {};
			vmAutoCompleteMenu.startingSearch = vmAutoCompleteMenu.options.startingSearch || 2;
			vmAutoCompleteMenu.suggestionsNumber = vmAutoCompleteMenu.options.suggestionsNumber || 5;
			vmAutoCompleteMenu.placeholder = vmAutoCompleteMenu.options.placeholder || 'Search states';
			vmAutoCompleteMenu.itemSearch = '';
			vmAutoCompleteMenu.feedbackMessage = '';
			vmAutoCompleteMenu.filteredFields = [];
			vmAutoCompleteMenu.totalFilteredFields = 0;
			vmAutoCompleteMenu.activeField = -1;
			vmAutoCompleteMenu.onSearch = onSearch;
			vmAutoCompleteMenu.onSelectField = onSelectField;
			vmAutoCompleteMenu.onKeyDown = onKeyDown;
			vmAutoCompleteMenu.onMouseOver = onMouseOver;
			vmAutoCompleteMenu.onBlurSearch = resetValues;
			vmAutoCompleteMenu.onClearSearch = onClearSearch
			vmAutoCompleteMenu.onClickField = onClickField;
		}

		init();

		function onSearch() {
			if (vmAutoCompleteMenu.itemSearch.length >= vmAutoCompleteMenu.startingSearch) {
				console.log('search..');
				StateService.getStates(vmAutoCompleteMenu.itemSearch).then(function (resp) {
					console.log('result of search:', resp);
					vmAutoCompleteMenu.filteredFields = resp.data;
					vmAutoCompleteMenu.totalFilteredFields = resp.count;
					vmAutoCompleteMenu.feedbackMessage = resp.message ? resp.message : '';
				});
			} else {
				resetValues();
			}
		}

		function onClickField(currentItem) {
			onSelectField(currentItem);
			resetValues();
		}

		function onSelectField(currentItem) {
			console.log('currentItem', currentItem);
			var formatCurrentItem = currentItem.name;
			vmAutoCompleteMenu.itemSearch = formatCurrentItem;
		}

		function onClearSearch() {
			console.log('clear item');
			vmAutoCompleteMenu.itemSearch = '';
			resetValues();
		}

		function resetValues() {
			vmAutoCompleteMenu.activeField = -1;
			vmAutoCompleteMenu.feedbackMessage = '';
			vmAutoCompleteMenu.filteredFields = [];
		}

		function onKeyDown(e) {
			if (vmAutoCompleteMenu.filteredFields.length) {
				switch (e.keyCode) {
					case 13: proccessKeyDown('select'); break;
					case 38: proccessKeyDown('up'); break;
					case 40: proccessKeyDown('down'); break;
				}
			}
		}

		function onMouseOver(index) {
			vmAutoCompleteMenu.activeField = index;
		};

		function proccessKeyDown(action) {
			var len = vmAutoCompleteMenu.filteredFields.length;
			if (action === 'up') {
				if ((vmAutoCompleteMenu.activeField - 1) % len > -1) {
					vmAutoCompleteMenu.activeField = (vmAutoCompleteMenu.activeField - 1) % len;
					document.querySelector('#container-autocomplete').scrollTop = 29*vmAutoCompleteMenu.activeField;
					vmAutoCompleteMenu.onSelectField(vmAutoCompleteMenu.filteredFields[vmAutoCompleteMenu.activeField]);
				}
			} else if (action === 'down') {
				if (vmAutoCompleteMenu.activeField === -1) {
					vmAutoCompleteMenu.activeField += 1;
					vmAutoCompleteMenu.onSelectField(vmAutoCompleteMenu.filteredFields[vmAutoCompleteMenu.activeField]);
				} else if (((vmAutoCompleteMenu.activeField + 1) % len)) {
					vmAutoCompleteMenu.activeField = (vmAutoCompleteMenu.activeField + 1) % len;
					document.querySelector('#container-autocomplete').scrollTop = 29*vmAutoCompleteMenu.activeField;
					vmAutoCompleteMenu.onSelectField(vmAutoCompleteMenu.filteredFields[vmAutoCompleteMenu.activeField]);
				}
			} else if (action === 'select') {
				onClickField(vmAutoCompleteMenu.filteredFields[vmAutoCompleteMenu.activeField]);
			}
		}

	}
})();
