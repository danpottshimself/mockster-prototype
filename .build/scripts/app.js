(function () {
	'use strict';
	angular.module('Tombola.Mockster', []);

})();

(function () {
    'use strict';
    angular.module('Tombola.Mockster')
		.controller('MocksterController', ['$scope', 'MocksterService', function ($scope, mocksterService) {
			$scope.mocksterService = mocksterService;
		}]);
})();

(function () {
    'use strict';
    angular.module('Tombola.Mockster')
		.service('MocksterService', function () {
			var me = this;
			me.foo = 'Hi';
		});
})();
