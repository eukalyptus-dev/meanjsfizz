'use strict';

// Fizz buzz module config
angular.module('fizz-buzz').run(['Menus',
	function(Menus) {
		// Config logic
		// ...
		Menus.addMenuItem('topbar', 'FizzBuzz', 'fizz-buzz', 'item', '/fizz-buzz', true);
	}
]);
