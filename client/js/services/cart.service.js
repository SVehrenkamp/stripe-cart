angular.module('Cart', [])
	.service('$cart', function(){
		return {
			total: 0,
			total_items: 0
		};
	});