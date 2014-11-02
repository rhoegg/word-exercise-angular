angular.module("hoegg-sample", [])
	.controller("WordController", function($scope, $http, $interval) {
		function beginWaiting(message) {
			$scope.data.previousWord = $scope.data.word;
			$scope.data.word = null;
			$scope.data.disabled = true;
			$scope.data.serverError = false;
			$scope.data.status = message;
			$scope.data.statusPromise = $interval(function() {
				$scope.data.status += ".";
			}, 1000);
		}
		
		function stopWaiting() {
			$scope.data.disabled = false;
			$interval.cancel($scope.data.statusPromise);
		}

		$scope.data = {
			status: 'Well?',
			disabled: false,
			serverError: false
		};

		$scope.generateWord = function() {
			if ($scope.data.disabled) return;
			$http.get('http://oseberg.io/interview/word_generator.php')
				.success(function(data) {
					$scope.data.word = data;
					stopWaiting();
				})
				.error(function(data) {
					stopWaiting();
					$scope.data.serverError = data;
					$scope.data.word = $scope.data.previousWord;
				});
				beginWaiting('Please wait for word.');
		};
		
		$scope.transformWord = function() {
			if ($scope.data.disabled) return;
			$http.get('http://oseberg.io/interview/shifter.php', { params: { word: $scope.data.word } })
				.success(function(data) {
					$scope.data.word = data;
					stopWaiting();
				})
				.error(function(data) {
					stopWaiting();
					$scope.data.serverError = data;
					$scope.data.word = $scope.data.previousWord;
				});
			beginWaiting('Please wait for transformation.');
		};
	});
	
