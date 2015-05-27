angular.module('ConfirmationCTRL', [])
	.controller('ConfirmationCTRL', function($scope, $location, $http, $cart){
		$scope.thanks = "Thank you for your order!"

		//Set Checkout Variables from Cart Service
		$scope.items_in_cart = $cart.get_items();
		$scope.total = $cart.get_cart_total();
		$scope.shipping_total = $cart.calc_shipping();

		$scope.confirmed_order = $cart.get_user();
		console.log($scope.confirmed_order);
		var $TOKEN = 'st5UkKrBPvqXH5jaqf11ou4tR49dyWNBwIWpuoizjcqw1Yqazw9RRrE81JNk195a';
		var save_order = function(order){
			$http.post('api/orders?access_token='+$TOKEN, order).success(function(data){
				console.log('Order Successfully saved to MongoDB!', data);
			});
		}

		save_order($cart.get_user());
	});