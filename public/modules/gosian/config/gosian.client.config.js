'use strict';

// Gosian module config
angular.module('gosian').run(['Menus',
	function(Menus) {
		// Config logic
		// ...
		Menus.addMenuItem('topbar', '\'Gosian\'', 'gosian', 'item', '/gosian', true);
	}
]);
