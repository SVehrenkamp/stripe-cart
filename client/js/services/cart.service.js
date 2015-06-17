angular.module('Cart', [])
	.service('$cart', function($http){
		//Mock Data
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
			description: 'Teleportation Unit in Silver.  Designed for medium to light teleporting.',
			qty: 1,
			price: 1300	 
		};

		var cart_items = [item, item2];
		var cart_total = null;
		var order_number = null;
		var user = {};

		return {
			total: 0,
			total_items: 0,
			sum: 0,
			shipping_total: 0,

			add_item: function(item){
				cart_items.push(item);
				return cart_items;
			},
			remove_item: function($index){
				cart_items.splice($index, 1);
				return cart_items;
			},
			get_items: function(){
				return cart_items;
			},
			get_cart_total: function(){
				sum = 0;
				cart_total = 0;
				for(var i=0; i < cart_items.length; i++){
					sum += (cart_items[i].price * cart_items[i].qty);
					cart_total += cart_items[i].qty;
				}
				if(isNaN(sum)) sum = 0;
				var shipping = this.calc_shipping();

				return {
					sum: sum + shipping,
					total_items: cart_total
				};
			},
			update_qty: function(i, qty){
				console.log(i);
				cart_items[i].qty = parseInt(qty);
				this.get_cart_total();
				console.log('Updating Cart!', cart_items[i].qty);

			},
			calc_shipping: function(){
				shipping_total = 5;
				if(cart_total > 5 && cart_total <= 10){
					shipping_total = 10;
				} else if(cart_total > 10){
					shipping_total = 0;
				}

				return shipping_total;
			
			},
			set_user:function(userData){
				user = userData;
				console.log(user);
				return false;
			},
			get_user: function(){
				console.log(user);
				return user;
			},
			save_order: function(order){
				$http.post('complete-order', order).success(function(data){
					console.log('Order Successfully saved to MongoDB!', data);
				});
			},
			complete_current_order: function(form_data, usr, response){
				var self = this;
				$http.post('/complete_transaction', form_data).then(function(resp){
				console.log('Success!', resp);

				if(resp.status === 200 ){

					self.set_user(usr);
					var order_number = resp.data.order_number;

					user.order_number = order_number;
					user.ordered_items = cart_items;
					user.num_ordered_items = cart_total;
					user.order_total = sum;
					user.shipping_total = shipping_total;
					user.shipping = shipping_total;
					user.date = new Date();

					self.save_order(user);
					
					response('Success');

				} else{
					response('Error');
				}
			});

				return user;
			}
		};
	});