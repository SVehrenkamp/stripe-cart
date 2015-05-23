angular.module('CheckoutCTRL', [])
.controller('CheckoutCTRL', function($scope, $http){
	
	var $form = $('#payment-form');
	
	$scope.tokenize = function(){

		$form.find('button').prop('disabled', true);

		Stripe.card.createToken($form, $scope.stripeResponseHandler);

		return false;
	};

	$scope.stripeResponseHandler = function(status, response){

		if(response.error){
			console.log("ERROR: ", response.error)
		} else{
			var form_data = {};
			var token = response.id;

			form_data.stripeToken = token;

			$http.post('/complete_transaction', form_data).then(function(data){
				console.log('Success!', data);

				if(data.status === 200 ){
					$('#success').append('<h2>Approved!</h2>');
				}
			});

		}
	}
});