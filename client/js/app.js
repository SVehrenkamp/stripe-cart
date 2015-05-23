angular.module('App', ['ui.router', 'CheckoutCTRL'])
.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('home', {
			url: '/',
			views: {
				'Main': {
					templateUrl: 'js/partials/home.partial.html'
				}
			}
		})
		.state('checkout', {
			url: '/checkout',
			views: {
				'Main': {
					controller: 'CheckoutCTRL',
					templateUrl: 'js/partials/checkout.partial.html'
				}
			}
		});
});