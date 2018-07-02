var StellarSdk = require('stellar-sdk');
var config = require('./config');
var server = new StellarSdk.Server(config.server);
var sourceKeys = StellarSdk.Keypair.fromSecret(config.secret);
var express = require('express');
var request = require('request'); 

//StellarSDK.Keypair.fromSecret was already created so this may be redundant
//var pair = StellarSDK.Keypair.random(); 

var app = express();
var srcAccount = config.account;

app.listen(3000,()=> console.log('stellar api listen'));

StellarSdk.Network.useTestNetwork();

var testDestination = 'GAGJPIYKYJAIGZU4IJRTCLD66E4AK5EJKT5WS4X42OG3A3NEZX7C7ZNQ';
//api to create secret and public key

//save transactions to database because if error

//api to use friendbot to fund account

	//Funding an account 
	request.get({
		url: 'https://friendbot.stellar.org',
		qs: {addr: pair.publicKey() }, 
		json: true },
		    function(error, response, body) {
			console.error('ERR', error || body);
				if (error || response.statusCode !== 200){
				}
				else {
					console.log('success :)\n' body); 
				}
		});

//api to get account details and check balance. pass Account details as param
	server.loadAccount(pair.publicKey()).then(function(account){
		console.log('Balances for account: ' + pair.publicKey());
			    account.balances.forEach(function(balance) {
				console.log('Type: ', balance.asset_type, ',Balance:', balance.balance);
		});
	}); 

//api to send payment. Param: sender account to temp account from edchain
//app.post('/steller/payment/send/:account', function(req,res){
	//test account
	server.loadAccount(testDestination)
		.catch(StellarSdk.NotFoundError, function(err){
			throw new Error('Destination account does not exist');
		})
		.then(function(){
			return server.loadAccount(sourceKeys.publicKey());
		})
		.then(function(srcAccount){
			transaction = new StellarSdk.TransactionBuilder(srcAccount)
			  .addOperation(StellarSdk.Operation.payment({
			  	 destination:testDestination,
			  	 asset:StellarSdk.Asset.native(), //change asset later
			  	 amount: 10
			  }))
			  .addMemo(StellarSdk.Memo.text('testTransaction'))
			  .build();

			transaction.sign(sourceKeys);

			return server.submitTransaction(transaction);
		})
		.then(function(result){
			console.log('success',result);
		})
		.catch(function(err){
			console.error('ERR',err);
		})
//});

//api to receive payment


/*
server.transactions()
	.forLedger(1400)
	.call().then(function(r){console.log(r);});


server.transactions()
	.forAccount(srcAccount)
	.call().then(function(r){console.log(r.records[0].account);});


server.payments()
	.limit(1)
	.call()
	.then(function(response){
		response.records[0].transaction().then(function(txs){
			console.log(txs);
		})
	})

	server.ledgers()
		.limit(1)
		.order("desc")
		.call()
		.then(function (lResult){
			console.log(lResult.records[0].fee_pool);
		});
*/
