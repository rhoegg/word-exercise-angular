angular.module("hoegg-sample", [])
	.controller("WordController", function($scope, $http, $interval) {
		function beginWaiting(message) {
			$scope.data.word = null;
			$scope.data.disabled = true;
			$scope.data.status = message;
			$scope.data.statusPromise = $interval(function() {
				$scope.data.status += ".";
			}, 1000);
		}

		$scope.data = {};
		$scope.data.status = 'Well?';
		$scope.data.disabled = false;

		$scope.generateWord = function() {
			$http.get('http://oseberg.io/interview/word_generator.php')
				.success(function(data, status, headers, config) {
					$scope.data.word = data;
					$scope.data.disabled = false;
					$interval.cancel($scope.data.statusPromise);
				})
				.error(function(data, status, headers, config) {
					$scope.data.disabled = false;
					$interval.cancel($scope.data.statusPromise);
					$scope.data.status = 'Oops!';
				});
				beginWaiting('Please wait for word.');
		};
		
		$scope.transformWord = function() {
			$http.get('http://oseberg.io/interview/shifter.php', { params: { word: $scope.data.word } })
				.success(function(data, status, headers, config) {
					$scope.data.word = data;
					$scope.data.disabled = false;
					$interval.cancel($scope.data.statusPromise);
				})
				.error(function(data, status, headers, config) {
					$scope.data.disabled = false;
					$interval.cancel($scope.data.statusPromise);
					$scope.data.status = 'Oops!';
				});
			beginWaiting('Please wait for transformation.');
		};
	});
	
