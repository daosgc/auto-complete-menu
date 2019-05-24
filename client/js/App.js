import appStyles from '../sass/app.scss';
import angular from 'angular';

(function () {
	'use strict';
	angular.module('app', [
		'app.controllers',
		'app.services',
		'app.directives'
	]);

	//init modules
	angular.module('app.controllers', []);
	angular.module('app.directives', []);
	angular.module('app.services', []);
})();
