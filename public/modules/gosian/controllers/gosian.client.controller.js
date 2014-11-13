'use strict';

angular.module('gosian').controller('GosianController', ['$scope',
	function($scope) {
		// Controller Logic
		// ...
		$scope.savetxt = window.savetxt;
		$scope.js_beautify = window.js_beautify;

		$scope.matA = [];
		$scope.vecB = [];
		$scope.getRandomInt = function(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		};
		$scope.Matrix = window.Matrix;

		$scope.doGosian = function() {

			//The Algorithm is using the Sylvester library for Matrix and Vector manipulations, mainly for Matrix
			//multiplications but also for easier code reading,so the logic can be followed all along the code
			//focusing more on the algebra and less on the arrays manipulations.
			//The library is available at http://sylvester.jcoglan.com/#download or by using Bower

			//The notation used for the System is A*X = b
			//where A is the original Coefficients Matrix,
			//b is the Constants Vector,
			//and X is the Variables Vector we are trying to get as a Result

			//the final equivalent equation is considered to be U*X = c
			//where U is A after all the Row Operations are applied to the Augmented Matrix
			//and c is the Constants Vector after all the Row Operations are applied to the Augmented Matrix

			//All along the process, the Augmented Matrix is manipulated through three Elementary Row Operations:
			//	*Row Swapping
			//	[1  0  0 ]   [1  2  3 ]   [1  2  3 ]
			//	[0  0  1 ] * [4  5  6 ] = [7  8  9 ]
			//	[0  1  0 ]   [7  8  9 ]   [4  5  6 ]
			//	*Multiplying a Row by a non Zero Number
			//	[1  0  0 ]   [1  2  3 ]   [1  2  3 ]
			//	[0  10 0 ] * [4  5  6 ] = [40 50 60]
			//	[0  0  1 ]   [7  8  9 ]   [7  8  9 ]
			//	*Adding a multiple of one Row to another Row
			//	[1  0  0 ]   [1  2  3 ]   [1  2  3 ]
			//	[0  1  0 ] * [4  5  6 ] = [4  5  6 ]
			//	[-3 0  1 ]   [7  8  9 ]   [4  2  0 ]


			var output = '';
			var i, k;

			var U = $scope.Matrix.create($scope.matA);
			var c = $scope.Matrix.create($scope.vecB);

			var m = $scope.m;
			var n = $scope.n;

			var E = $scope.Matrix.Zero(m,m);

			var Aug = U.augment(c);

			var error = false;

			for (k=1; k <= Math.min(m,n); k++) {
				output += 'Echelon #' + k + ':' + '\r\n';
				//Partial Pivoting: The largest possible Pivot's Absolute Value is chosen by switching rows. This improves numerical stability by trying to avoid division by very small numbers, preventing loss of accuracy in the computation
				var piv_col = Aug.minor(k,k,m-k+1,1);
				var piv_max = piv_col.max();
				var row_piv_max = piv_col.indexOf(piv_max).i + k - 1;

				output += 'Ideal Pivot is in Row: ' + row_piv_max + '\r\n';
				if (Aug.e(row_piv_max,k) === 0) {
					output += 'ERROR: SINGULAR MATRIX, ONE OR MORE ROWS ARE NOT LINEARLY INDEPENDENT' + '\r\n';
					error = true;
					break;
				}

				if (row_piv_max > k) {
					output += 'Switching Rows ' + k + ' and ' + row_piv_max + '\r\n';
					E = $scope.Matrix.Zero(m,m);
					for (i=1; i<= m; i++) {
						if (i === k) {
							E.elements[k-1][row_piv_max-1] = 1;
						} else if (i === row_piv_max) {
							E.elements[row_piv_max-1][k-1] = 1;
						} else E.elements[i-1][i-1] = 1;
					}
					output += 'Transformation matrix: \r\n' + E.inspect().replace(/\n/g, '\r\n') + '\r\n';
					Aug = E.multiply(Aug);
					output += 'Row Switching Result: \r\n' + Aug.inspect().replace(/\n/g, '\r\n') + '\r\n';
				}

				for (i=k+1; i<=m; i++) {
					output += 'Eliminating X' + k + ' in Row ' + i + '\r\n';
					var multiplier = -Aug.elements[i-1][k-1] / Aug.elements[k-1][k-1];

					E = $scope.Matrix.I(m);
					E.elements[i-1][k-1] = multiplier;

					output += 'Transformation matrix: \r\n' + E.inspect().replace(/\n/g, '\r\n') + '\r\n';
					Aug = E.multiply(Aug);
					output += 'Elimination Result: \r\n' + Aug.inspect().replace(/\n/g, '\r\n') + '\r\n';

				}

			}

			if (!error) {
				output += 'Row Echelon Form Gaussian Elimination Result: \r\n' + Aug.inspect().replace(/\n/g, '\r\n') + '\r\n';
				if (m >= n) {
					output += 'The Equation System Has one Solution' + '\r\n';
					if (m > n) {
						output += 'Eliminating Useless Rows...' + '\r\n';
						E = $scope.Matrix.Zero(n,m);
						for (i=1; i<= n; i++) {
							E.elements[i-1][i-1] = 1;
						}
						output += 'Transformation matrix: \r\n' + E.inspect().replace(/\n/g, '\r\n') + '\r\n';
						Aug = E.multiply(Aug);
						output += 'Augmented matrix: \r\n' + Aug.inspect().replace(/\n/g, '\r\n') + '\r\n';
					}
					output += 'Back Substitution:' + '\r\n';
					var X = [];
					for (k=n; k>0; k--) {
						var aux = 0;
						var auxstr = '';
						for (i = n; k <= i; i--) {
							if (i > k) {
								aux += Aug.e(k, i) * X[i];
								if (aux >= 0) {
									auxstr += ' +' + aux;
								} else {
									auxstr += ' -' + -aux;
								}
							} else {
								X[k] = (Aug.e(k, n + 1) - aux) / Aug.e(k, i);
								if (auxstr !== '') auxstr = ' -(' + auxstr + ')';
								output += 'X' + k + ' = (' + Aug.e(k, n + 1) + auxstr + ') / ' + Aug.e(k, i) + '\r\n';
							}
						}
					}
					output += 'FINAL RESULT:' + '\r\n';
					for (k=1; k<=n; k++) {
						output += 'X' + k + ' = ' + X[k] + '\r\n';
					}
				} else {
					output += 'The Equation System Has Infinite Solutions' + '\r\n';
				}
			} else {
				output += 'Output: \r\n' + Aug.inspect().replace(/\n/g, '\r\n') + '\r\n';
			}
			return output;
		};

		$scope.regen = function() {
			while ($scope.matA.length > $scope.m) {
				$scope.matA.pop();
			}
			while ($scope.vecB.length > $scope.m) {
				$scope.vecB.pop();
			}
			while ($scope.matA.length < $scope.m) {
				var newrow = [];
				for (var j = 0; j < $scope.n; j++) {
					newrow.push($scope.getRandomInt(-10,10));
				}
				$scope.matA.push(newrow);
			}
			while ($scope.vecB.length < $scope.m) {
				$scope.vecB.push($scope.getRandomInt(-10,10));
			}
			for (var i=0; i< $scope.m; i++) {
				while ($scope.matA[i].length > $scope.n) {
					$scope.matA[i].pop();
				}
				while ($scope.matA[i].length < $scope.n) {
					$scope.matA[i].push($scope.getRandomInt(-10,10));
				}
			}
		};
	}
]);
