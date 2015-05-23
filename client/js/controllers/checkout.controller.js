angular.module('CheckoutCTRL', [])
.controller('CheckoutCTRL', function($scope){
	$scope.tokenize = function(){

		var $form = $('#payment-form');

		$form.find('button').prop('disabled', true);

		Stripe.card.createToken($form, $scope.stripeResponseHandler);

		return false;
	};
	$scope.stripeResponseHandler = function(status, response){
		console.log('STATUS: ', status);
		console.log('RESPONSE: ', response);
	}
});