'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$location',
	function($scope, Authentication, $location) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.examples = [
			{
				name: 'Fibonacci',
				description: 'Plain Fibonacci Sequence Generator',
				icon: 'sort-by-attributes',
				color: 'info',
				route: '/fibonacci'
			},
			{
				name: 'FizzBuzz',
				description: 'Classic FizzBuzz Test',
				icon: 'indent-left',
				color: 'success',
				route: '/fizz-buzz'
			},
			{
				name: '\'Gosian\'',
				description: 'Linear Algebra Gaussian Elimination',
				icon: 'th-large',
				color: 'danger',
				route: '/gosian'
			}
		];

		$scope.go = function ( path ) {
			$location.path( path );
		};

		window.savetxt = function( content, filename ) {

			filename = filename || 'output.txt';

			var a = window.document.createElement('a');
			// Append anchor to body.
			document.body.appendChild(a);
			a.href = "#";
			a.setAttribute('download', filename);
			var blobObject = new Blob([content], {type: 'text/plain'});
			a.href = window.URL.createObjectURL(blobObject);
			if (window.navigator.msSaveOrOpenBlob) {
				window.navigator.msSaveOrOpenBlob(blobObject, filename);
			} else {
				a.click();
				a.click(); // Tweak so that new versions of Chrome allow for filename choosing by javascript.
			}
			// Remove anchor from body
			document.body.removeChild(a);

			return content;
		};
	}
]);
