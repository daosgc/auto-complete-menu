'use strict';

import appStyles from '../sass/app.scss';
import angular from 'angular';

var app = angular.module('app', ['app.directives', 'app.services']);

//init modules
angular.module('app.directives', []);
angular.module('app.services', []);

app.controller('PrincipalCtrl', function(StateService) {
	var vm = this;
	vm.tittlePage = 'Autocomplete Component';
	vm.autoCompleteOptions = {
		label: 'States of EEUU'
	};
})
