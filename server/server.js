var loopback = require('loopback');
var boot = require('loopback-boot');
var config = require('../config');
var stripe = require("stripe")(config.secret);
var fs = require('fs');
var path = require('path');
var ejs = require('ejs');

var mandrill = require("mandrill-api/mandrill");
var mandrill_client = new mandrill.Mandrill(config.mandrill);

var app = module.exports = loopback();

boot(app, __dirname);
var Cart = require('smv-cart');

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

//Send Confirmation Email
var send_confirmation = function(order){	//Add Message Template Here
	var message = require('../email/message.json');
	var tpldata = order;
	var templateString = null;

	fs.readFile(path.join(__dirname, '../email/order.ejs'), 'utf8', function(err, data){
		if(err) throw err;
		templateString = data;
		var template = ejs.render(templateString, tpldata);
		message.html = template;
		message.to[0].email = tpldata.email;
		message.to[0].name = tpldata.first_name +' '+tpldata.last_name;
		message.merge_vars[0].rcpt = tpldata.email;
		message.recipient_metadata[0].rcpt = tpldata.email;


		var async = false;
		var ip_pool = "Main Pool";
		
		mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
		    console.log(result);
		}, function(e) {
		    // Mandrill returns the error as an object with name and message keys
		    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
		    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
		});		

	});

}

//Save Order Data to Mongo
app.use('/complete-order', loopback.bodyParser(), function(req, res){
	var order = req.body;
	
	Cart.save_order(order, res);
	send_confirmation(order);

});
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
if (require.main === module){
    app.start();
}
