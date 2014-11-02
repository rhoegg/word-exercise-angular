describe('WordController', function() {
	var scope;
	var controller;
	
	beforeEach(module('hoegg-sample'));
	
	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		controller = $controller('WordController', {$scope: scope});
	}));
	
	it('should not be disabled', function() {
		expect(scope.data.disabled).to.be.false;
	});
	
	it('should not indicate server error', function() {
		expect(scope.data.serverError).to.be.false;
	});
	
	it('should have a placeholder', function() {
		scope.data.status.should.not.equal(null);
	});
});