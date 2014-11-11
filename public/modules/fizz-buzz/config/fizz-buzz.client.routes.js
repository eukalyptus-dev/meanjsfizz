'use strict';

//Setting up route
angular.module('fizz-buzz').config(['$stateProvider',
	function($stateProvider) {
		// FizzBuzz state routing
		$stateProvider.
			state('fizz-buzz', {
				url: '/fizz-buzz',
				templateUrl: 'modules/core/views/home.client.view.html',

				onEnter: ['$stateParams', '$state', '$modal', '$resource', function($stateParams, $state, $modal, $resource) {
					$modal.open({
						windowClass: 'app-modal-window container',
						backdrop: 'static',
						templateUrl: 'modules/fizz-buzz/views/fizz-buzz.client.view.html',
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
