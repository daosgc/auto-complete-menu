(function () {
	'use strict';
	angular
	  .module('app.controllers')
	  .controller('HomeCtrl', HomeCtrl);

	  function HomeCtrl() {
		var vmHome = this;
		vmHome.titlePage = 'Autocomplete Component';
		vmHome.autoCompleteOptions = {
			label: 'States of EEUU',
			callbacks: {
				onSelectItem: onSelectItem,
				onClearItem: onClearItem

			}
		};

		function onSelectItem(item){
			vmHome.itemSelected = item;
		}

		function onClearItem(){
			vmHome.itemSelected = null;
		}
	  }
})();
