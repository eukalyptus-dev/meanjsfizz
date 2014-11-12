'use strict';

angular.module('fibonacci').controller('FibonacciController', ['$scope',
	function($scope) {
		// Controller Logic
		// ...
		$scope.savetxt = window.savetxt;

		$scope.fibo = function(n) {
			n = n || 0;
			var series = [], i = 0;
			if (n >= 0) {
				var a1 = 0,
					a2 = 1,
					aux;
				series.push(i + ':\t' + a1);
				while (n-- > 0) {
					i++;
					aux = a1;
					a1 = a2;
					a2 += aux;
					series.push(i + ':\t' + a1);
				}
			}

			var output = series.join('\r\n');
			console.clear();
			console.log(output);
			return output;

		};
	}
]);
