describe('WordController', function() {
	var scope;
	var controller;
	
	beforeEach(module('hoegg-sample'));
	
	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		controller = $controller('WordController', {$scope: scope});
	}));
	
	describe('when it is created', function() {
	
		it('should not be disabled', function() {
			expect(scope.data.disabled).to.be.false;
		});
	
		it('should not indicate server error', function() {
			expect(scope.data.serverError).to.be.false;
		});
	
		it('should have a placeholder', function() {
			expect(scope.data.status).not.to.be.null;
		});

	});
	
	describe('generateWord()', function() {
		var httpBackend;
		
		beforeEach(inject(function($httpBackend) {
			httpBackend = $httpBackend;
		}));
		
		it('should clear and update word property using web service', function() {
			httpBackend.whenGET(function(url) { return url.match(/.*word_generator\.php/) }).respond(200, 'Test Word');
			scope.generateWord();
			expect(scope.data.word).to.be.null;
			httpBackend.flush();
			scope.data.word.should.equal('Test Word');
		});
		
		it('should be disabled while waiting for a response', function() {
			httpBackend.whenGET(function(url) { return url.match(/.*word_generator\.php/) }).respond(200, 'Test Word');
			scope.generateWord();
			scope.data.disabled.should.be.true;
			httpBackend.flush();
			scope.data.disabled.should.be.false;
		});
		
		it('should set status to "Please wait for word."', function() {
			scope.generateWord();
			scope.data.status.should.equal('Please wait for word.');
		});
		
		describe('when the web service returns an error', function() {
			beforeEach(function() {
				httpBackend.whenGET(function(url) { return url.match(/.*word_generator\.php/) }).respond(503, 'The server is busy.');
			});
			
			it('should set serverError property', function() {
				scope.generateWord();
				httpBackend.flush();
				scope.data.serverError.should.equal('The server is busy.');
			});
			
			it('should set word property to the prior value', function() {
				scope.data.word = 'Old Word';
				scope.generateWord();
				expect(scope.data.word).to.be.null;
				httpBackend.flush();
				expect(scope.data.word).to.equal('Old Word');
			});
		});
	})
});