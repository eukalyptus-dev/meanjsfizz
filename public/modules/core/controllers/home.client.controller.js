'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$modal', '$log',
	function($scope, Authentication, $modal, $log) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.examples = [
			{
				name: 'Fibonacci',
				description: 'Plain Fibonacci Sequence Generator',
				icon: 'sort-by-attributes',
				color: 'info'
			},
			{
				name: 'FizzBuzz',
				description: 'Classic FizzBuzz Test',
				icon: 'indent-left',
				color: 'success'
			},
			{
				name: '\'Gosian\'',
				description: 'Linear Algebra Gaussian Elimination',
				icon: 'th-large',
				color: 'danger'
			}
		];

		//$scope.openModal = function (size) {
        //
		//	var modalInstance = $modal.open({
		//		templateUrl: 'modules/core/',
		//		controller: 'ModalInstanceCtrl',
		//		size: size,
		//		resolve: {
		//			items: function () {
		//				return $scope.items;
		//			}
		//		}
		//	});
        //
		//	modalInstance.result.then(function (selectedItem) {
		//		$scope.selected = selectedItem;
		//	}, function () {
		//		$log.info('Modal dismissed at: ' + new Date());
		//	});
		//};



	}
]);
