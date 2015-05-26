angular.module('CartCTRL', [])
	.controller('CartCTRL', function($scope, $http, $cart, $location){
		var item = {
			thumbnail: '/img/product.png',
			name: 'Teleportomatic 3100',
			description: 'Economy Teleportation Unit.  Designed for medium to light teleporting.',
			qty: 1,
			price: 1250 
		};
		var item2 = {
			thumbnail: '/img/product.png',
			name: 'Teleportomatic 3150',
			description: 'Economy Teleportation Unit in Silver.  Designed for medium to light teleporting.',
			qty: 1,
			price: 1300 
		};
		var cart_total = null;
		$scope.items_in_cart = [item, item2];

		var a = 1;
		$scope.total = function(){
			var sum = 0;
			cart_total = 0;
			for(var i=0; i < $scope.items_in_cart.length; i++){
				sum += ($scope.items_in_cart[i].price * $scope.items_in_cart[i].qty);
				cart_total += $scope.items_in_cart[i].qty;
			}
			if(isNaN(sum)) sum = 0;
			return sum;
		};

		$scope.shipping = function(){
			var shipping_total = 5;
			if(cart_total > 5){
				shipping_total = 10;
			} else if(cart_total >= 10){
				shipping_total = 0;
			}

			return shipping_total;
		};
		$scope.update_qty = function($index){
			$scope.items_in_cart[$index].qty = parseInt($scope.items_in_cart[$index].qty);
			console.log('Updating Cart!', $scope.items_in_cart[$index].qty);
		};

		$scope.remove_item = function($index){
			$scope.items_in_cart.splice($index, 1);
			console.log('Removing '+$index+' from cart.');
		};

		$scope.prepare_checkout = function(){
			$cart.total_items = cart_total;
			$cart.total = $scope.total();
			$location.path('/checkout');
			console.log($cart.total_items);
		};

	});