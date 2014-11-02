angular.module("hoegg-sample", [])
	.controller("WordController", function($scope, $http, $interval) {
		$scope.data = {};
		$scope.data.status = 'Well?';
		$scope.data.disabled = false;

		$scope.generateWord = function() {
			$scope.data.word = null;
			$scope.data.disabled = true;
			$scope.data.status = 'Please wait for word.'
			$scope.data.statusPromise = $interval(function() {
				$scope.data.status += ".";
			}, 1000);
			$http.get('http://oseberg.io/interview/word_generator.php')
				.success(function(data, status, headers, config) {
					$scope.data.word = data;
					$scope.data.disabled = false;
					$interval.cancel($scope.data.statusPromise);
				})
				.error(function(data, status, headers, config) {
					$scope.data.disabled = false;
					$interval.cancel($scope.data.statusPromise);
				});
		}
	});
	
