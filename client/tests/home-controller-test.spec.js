describe('HomeController ', function () {

	beforeEach(module('app'));

	var homeCtrl;;

	beforeEach(inject(function ($controller) {
		homeCtrl = $controller('HomeCtrl', {});
	}));

	it('Should home page have a title page defined', function () {
		var defaultNamePage = 'Autocomplete Component';
		expect(homeCtrl.titlePage).toEqual(defaultNamePage);
	});

	it('Should home page have options defined for auto-complete directive', function () {
		expect(homeCtrl.autoCompleteOptions.label).toContain('EEUU');
		expect(homeCtrl.autoCompleteOptions.callbacks).toBeDefined();
	});

});
