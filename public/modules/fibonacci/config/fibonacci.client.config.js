'use strict';

// Fibonacci module config
angular.module('fibonacci').run(['Menus',
	function(Menus) {
		// Config logic
		// ...
		Menus.addMenuItem('topbar', 'Fibonacci', 'fibonacci', 'item', '/fibonacci', true);
	}

]);
