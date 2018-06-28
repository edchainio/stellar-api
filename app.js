var StellarSdk = require('stellar-sdk');
var config = require('./config');
var server = new StellarSdk.Server(config.server);
var sourceKeys = StellarSdk.KeyPair.fromSecret(config.secret);
var express = require('express')
var transaction = new StellarSdk.TransactionBuilder();
var app = express()


app.listen(3000,()=> console.log('stellar api listen'));

StellarSdk.Network.useTestNetwork();


//api to create secret and public key


//api to use friendbot to fund account


//api to get account details and check balance. pass Account details as param


//api to send payment. Param: sender account to temp account from edchain


//api to receive payment



server.transactions()
	.forLedger(1400)
	.call().then(function(r){console.log(r);});


server.transactions()
	.forAccount(config.account)
	.call().then(function(r){console.log(/*r.records[0].account*/);});


/*server.payments()
	.limit(1)
	.call()
	.then(function(response){
		response.records[0].transaction().then(function(txs){
			console.log(txs);
		})
	})*/

	server.ledgers()
		.limit(1)
		.order("desc")
		.call()
		.then(function (lResult){
			console.log(lResult.records[0].fee_pool);
		});
