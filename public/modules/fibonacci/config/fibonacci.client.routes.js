'use strict';

//Setting up route
angular.module('fibonacci').config(['$stateProvider',
	function($stateProvider) {
		// Fibonacci state routing
		$stateProvider.
			state('fibonacci', {
				url: '/fibonacci',
				templateUrl: 'modules/core/views/home.client.view.html',

				onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
					$modal.open({
						windowClass: 'app-modal-window container',
						backdrop: 'static',
						size: 'lg',
						templateUrl: 'modules/fibonacci/views/fibonacci.client.view.html',
						resolve: {
							item: function() {}
						},
						controller: ['$scope', function($scope) {
							$scope.dismiss = function() {
								$scope.$dismiss();
							};

						}]
					}).result['finally'](function() {
						return $state.transitionTo('home');
					});
				}]

			});
	}
]);
