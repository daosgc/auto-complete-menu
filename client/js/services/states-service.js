(function () {
	'use strict';

	angular
		.module('app.services')
		.factory('StateService', StateService);

	function StateService($http, $q) {
		var service = {
			getStates: getStates
		};

		return service;

		function getStates(search_term) {
			var params = {
				term: search_term
			};

			return $http({
				method: 'GET',
				url: 'http://localhost:3000/api/states',
				params: params
			}).then(function success(res) {
				return res.data;
			}, function error(err) {
				var errorData = err.data;
				if(errorData.error){
					alert(errorData.error);
				}else{
					alert('Unknown Error');
				}
				return $q.reject(err);
			});
		}
	}
})();
