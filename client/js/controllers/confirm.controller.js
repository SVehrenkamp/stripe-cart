angular.module('ConfirmationCTRL', [])
	.controller('ConfirmationCTRL', function($scope, $location, $http, $cart){
		$scope.thanks = "Thank you for your order!"

		//Set Checkout Variables from Cart Service
		$scope.items_in_cart = $cart.get_items();
		$scope.total = $cart.get_cart_total();
		$scope.shipping_total = $cart.calc_shipping();

		$scope.confirmed_order = $cart.get_user();
		console.log($scope.confirmed_order);

	});