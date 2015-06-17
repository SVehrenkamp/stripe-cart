angular.module('CheckoutCTRL', [])
.controller('CheckoutCTRL', function($scope, $cart, $location){

	var $payment_form = $('#payment-form');
	$scope.user = {};
	$scope.cc = {};

	//Set Checkout Variables from Cart Service
	$scope.items_in_cart = $cart.get_items();
	$scope.total = $cart.get_cart_total();
	$scope.shipping_total = $cart.calc_shipping();

	//Payment Form Validations
	$scope.validation = {
		step_1: false,
		step_2: false
	};

	$scope.validate_fields = function(){
		//Step 1
		if($scope.user.first_name && $scope.user.last_name && $scope.user.phone && $scope.user.email){
			$scope.validation.step_1 = true;
		} else if(!$scope.user.first_name || !$scope.user.last_name || !$scope.user.phone || !$scope.user.email){
			$scope.validation.step_1 = false;
		}
		//Step 2
		if($scope.user.street_address && $scope.user.city && $scope.user.state && $scope.user.zip){
			$scope.validation.step_2 = true;
		} else if(!$scope.user.street_address || !$scope.user.city || !$scope.user.state || !$scope.user.zip){
			$scope.validation.step_2 = false;
		}
		//Step 3
		if($scope.cc.number && $scope.cc.cvc && $scope.cc.month && $scope.cc.year){
			$payment_form.find('button').prop('disabled', false);
		} else if(!$scope.cc.number || !$scope.cc.cvc || !$scope.cc.month || !$scope.cc.year){
			$payment_form.find('button').prop('disabled', true);
		}
		//Step 3
	}

	//Create auth token from payment card information
	$scope.tokenize = function(){
		$payment_form.find('button').prop('disabled', true);

		Stripe.card.createToken($payment_form, stripeResponseHandler);
		return false;
	};

	//Callback function to handle response from cart service
	var cartResponseHandler = function(response){
		if(response === "Success"){
			$location.path('/confirmation');
		} else{
			$('.payment-errors').append('<h2>Declined.</h2><br><p>Your Card Has Been Declined.</p>');
		}
	};

	//Callback function to handle response from tokenization
	var stripeResponseHandler = function(status, response){
		if(response.error){
			console.log("ERROR: ", response.error);
			$('.payment-errors').append('<h2>Declined.</h2><br><p>Your Card Has Been Declined.</p>');
				
		} else{
			console.log(response);
			var form_data = {};
			var token = response.id;

			form_data.stripeToken = token;
			form_data.chargeAmmount = $scope.total.sum;

			$cart.complete_current_order(form_data, $scope.user, cartResponseHandler);

		}
	};
});