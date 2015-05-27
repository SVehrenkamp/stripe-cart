angular.module('CheckoutCTRL', [])
.controller('CheckoutCTRL', function($scope, $http, $cart, $location){

	var $payment_form = $('#payment-form');
	$scope.user = {};

	//Set Checkout Variables from Cart Service
	$scope.items_in_cart = $cart.get_items();
	$scope.total = $cart.get_cart_total();
	$scope.shipping_total = $cart.calc_shipping();


	//Create auth token from payment card information
	$scope.tokenize = function(){
		$payment_form.find('button').prop('disabled', true);

		Stripe.card.createToken($payment_form, stripeResponseHandler);
		return false;
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

			$http.post('/complete_transaction', form_data).then(function(resp){
				console.log('Success!', resp);

				if(resp.status === 200 ){

					$cart.complete_current_order($scope.user, resp.data.order_number);

					$location.path('/confirmation');
				} else{
					$('.payment-errors').append('<h2>Declined.</h2><br><p>Your Card Has Been Declined.</p>');
				}
			});

		}
	}
});