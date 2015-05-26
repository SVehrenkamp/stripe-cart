angular.module('App', ['ui.router', 'CheckoutCTRL', 'CartCTRL', 'Cart'])
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
		.state('cart', {
			url: '/cart',
			views: {
				'Main': {
					controller: 'CartCTRL',
					templateUrl: 'js/partials/cart.partial.html'
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