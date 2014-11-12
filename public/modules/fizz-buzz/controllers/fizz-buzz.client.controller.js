'use strict';

angular.module('fizz-buzz').controller('FizzBuzzController', ['$scope',
	function($scope) {
		// Controller Logic
		// ...
		$scope.savetxt = window.savetxt;

		$scope.fizzBuzz = function(init, end, checks) {
			init = init || 1;
			end = end || 100;
			checks = checks || [[3*5, 3, 5],['FizzBuzz','Fizz','Buzz']];
			var list = [];
			for (var n = init; n <= end; n++) {
				var aux = n;
				for (var i = 0; i < checks[0].length; i++) {
					if (n % checks[0][i] === 0) {
						aux = checks[1][i];
						break;
					}
				}
				list.push(n + ':\t' + aux);
			}
			var output = list.join('\r\n');
			console.clear();
			console.log(output);
			return output;
		};

	}
]);
