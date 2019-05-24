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
		var vmAutoCompleteMenu = this,
			startingSearch;

		function init() {
			vmAutoCompleteMenu.options = vmAutoCompleteMenu.options || {};
			vmAutoCompleteMenu.placeholder = vmAutoCompleteMenu.options.placeholder || 'Search states';
			vmAutoCompleteMenu.itemSearch = '';
			vmAutoCompleteMenu.feedbackMessage = '';
			vmAutoCompleteMenu.filteredItems = [];
			vmAutoCompleteMenu.activeItem = -1;
			vmAutoCompleteMenu.onSearch = onSearch;
			vmAutoCompleteMenu.onKeyDown = onKeyDown;
			vmAutoCompleteMenu.onMouseOver = onMouseOver;
			vmAutoCompleteMenu.onBlurSearch = resetValues;
			vmAutoCompleteMenu.onClearSearch = onClearSearch
			vmAutoCompleteMenu.onClickItem = onClickItem;
			startingSearch = vmAutoCompleteMenu.options.startingSearch || 2;
		}

		init();

		function onSearch() {
			if (vmAutoCompleteMenu.itemSearch.length >= startingSearch) {
				StateService.getStates(vmAutoCompleteMenu.itemSearch).then(function (resp) {
					vmAutoCompleteMenu.filteredItems = resp.data;
					vmAutoCompleteMenu.feedbackMessage = resp.message ? resp.message : '';
				});
			} else {
				resetValues();
			}
		}

		function onClickItem(currentItem) {
			onSelectItem(currentItem);
			resetValues();
			if(vmAutoCompleteMenu.options.callbacks && vmAutoCompleteMenu.options.callbacks.onSelectItem){
				vmAutoCompleteMenu.options.callbacks.onSelectItem(currentItem);
			}
		}

		function onSelectItem(currentItem) {
			var formatCurrentItem = currentItem.name;
			vmAutoCompleteMenu.itemSearch = formatCurrentItem;
		}

		function onClearSearch() {
			vmAutoCompleteMenu.itemSearch = '';
			resetValues();
			if(vmAutoCompleteMenu.options.callbacks && vmAutoCompleteMenu.options.callbacks.onClearItem){
				vmAutoCompleteMenu.options.callbacks.onClearItem();
			}
		}

		function resetValues() {
			vmAutoCompleteMenu.activeItem = -1;
			vmAutoCompleteMenu.feedbackMessage = '';
			vmAutoCompleteMenu.filteredItems = [];
		}

		function onKeyDown(e) {
			if (vmAutoCompleteMenu.filteredItems.length) {
				switch (e.keyCode) {
					case 13: proccessKeyDown('select'); break;
					case 38: proccessKeyDown('up'); break;
					case 40: proccessKeyDown('down'); break;
				}
			}
		}

		function onMouseOver(index) {
			vmAutoCompleteMenu.activeItem = index;
		};

		function proccessKeyDown(action) {
			var len = vmAutoCompleteMenu.filteredItems.length;
			if (action === 'up') {
				if ((vmAutoCompleteMenu.activeItem - 1) % len > -1) {
					vmAutoCompleteMenu.activeItem = (vmAutoCompleteMenu.activeItem - 1) % len;
					document.querySelector('#container-autocomplete').scrollTop = 29 * vmAutoCompleteMenu.activeItem;
					onSelectItem(vmAutoCompleteMenu.filteredItems[vmAutoCompleteMenu.activeItem]);
				}
			} else if (action === 'down') {
				if (vmAutoCompleteMenu.activeItem === -1) {
					vmAutoCompleteMenu.activeItem += 1;
					onSelectItem(vmAutoCompleteMenu.filteredItems[vmAutoCompleteMenu.activeItem]);
				} else if (((vmAutoCompleteMenu.activeItem + 1) % len)) {
					vmAutoCompleteMenu.activeItem = (vmAutoCompleteMenu.activeItem + 1) % len;
					document.querySelector('#container-autocomplete').scrollTop = 29 * vmAutoCompleteMenu.activeItem;
					onSelectItem(vmAutoCompleteMenu.filteredItems[vmAutoCompleteMenu.activeItem]);
				}
			} else if (action === 'select') {
				onClickItem(vmAutoCompleteMenu.filteredItems[vmAutoCompleteMenu.activeItem]);
			}
		}

	}
})();
