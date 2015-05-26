angular.module('CheckoutCTRL', [])
.controller('CheckoutCTRL', function($scope, $http, $cart){

	var $form = $('#payment-form');
	
	$scope.total_items = $cart.total_items;
	$scope.total = $cart.total;


	$scope.tokenize = function(){

		$form.find('button').prop('disabled', true);

		Stripe.card.createToken($form, $scope.stripeResponseHandler);

		return false;
	};

	$scope.stripeResponseHandler = function(status, response){

		if(response.error){
			console.log("ERROR: ", response.error);

			$('.payment-errors').append('<h2>Declined.</h2><br><p>Your Card Has Been Declined.</p>');
				
		} else{
			var form_data = {};
			var token = response.id;

			form_data.stripeToken = token;

			$http.post('/complete_transaction', form_data).then(function(data){
				console.log('Success!', data);

				if(data.status === 200 ){
					$('#success').append('<h2>Approved!</h2>');
				} else{
					$('.payment-errors').append('<h2>Declined.</h2><br><p>Your Card Has Been Declined.</p>');
				}
			});

		}
	}
});