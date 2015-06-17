describe('CartService', function(){

	beforeEach(module('App'));

	var $cart;

	beforeEach(inject(function(_$cart_){
    	$cart = _$cart_;
  	}));

	//$cart.add_item
  	describe('$cart.add_item', function(){
  		it('Adds an item to the cart_items array', function(){
  			
  			var item = {
	  			thumbnail: '/img/product.png',
				name: 'Teleportomatic 3200',
				description: 'Deluxe Teleportation Unit in Silver.  Designed for medium to light teleporting.',
				qty: 1,
				price: 2000
			};

  			$cart.add_item(item);
  			expect($cart.get_items().length).toEqual(3);
  		});
  	});

  	//$cart.remove_item
  	describe('$cart.remove_item', function(){
  		it('Removes an item from the cart_items array', function(){
  			var $index = 0;
  			$cart.remove_item($index);
  			expect($cart.get_items().length).toEqual(1);
  		});
  	});

});