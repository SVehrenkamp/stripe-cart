var loopback = require('loopback');
var boot = require('loopback-boot');
var config = require('../config');
var stripe = require("stripe")(config.secret);

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};


//Charge Customer Card Immediately 
app.use('/complete_transaction', loopback.bodyParser(), function(req, res){

//Tokenized info
var stripeToken = req.body.stripeToken;
var chargeAmmount = req.body.chargeAmmount * 100;
var order_number = '';

	var charge = stripe.charges.create({
	  amount: chargeAmmount, // amount in cents, again
	  currency: "usd",
	  source: stripeToken,
	  description: "Order Number 100012 from MyStore.com" 
	}, function(err, charge) {
	  if (err && err.type === 'StripeCardError') {
	    // The card has been declined
	    res.json({"status":"401 Card Declined"});
	  } else {
	  	order_number = 'xxxx-4xxx-yxxx-xxxx'.replace(/[xy]/g, function(c) {
		    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		    return v.toString(16);
		});
	  	res.json({"status":"200 OK", "chargeAmmount":chargeAmmount, "order_number":order_number});
	  }
	});
});


// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
