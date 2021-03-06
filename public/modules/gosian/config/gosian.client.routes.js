'use strict';

//Setting up route
angular.module('gosian').config(['$stateProvider',
	function($stateProvider) {
		// Gosian state routing
		$stateProvider.
			state('gosian', {
				url: '/gosian',
				templateUrl: 'modules/core/views/home.client.view.html',

				onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
					$modal.open({
						windowClass: 'app-modal-window container',
						backdrop: 'static',
						size: 'lg',
						templateUrl: 'modules/gosian/views/gosian.client.view.html',
						resolve: {
							item: function() {  }
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
