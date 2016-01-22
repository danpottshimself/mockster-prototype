var express = require('express');
var myApp = express();
var fs = require('fs');

myApp.get('/', function (req, res) {
	console.log("Got a GET request for the homepage");
	res.send('Hello GET');
});

myApp.get('/connect/:game', function (req, res) {
	var obj;
	obj = fs.readFileSync(__dirname + "/games/" + req.params.game + "/" + req.params.game + '.json', 'utf8');
	obj = JSON.parse(obj);
	res.send(obj.connect);
});

myApp.post('/send/:game/auth', function (req, res) {
	var obj;
	obj = fs.readFileSync(__dirname + "/games/" + req.params.game + "/" + req.params.game + '.json', 'utf8');
	obj = JSON.parse(obj);
	res.send(obj.auth);
});

myApp.post('/send/:game/purchase', function (req, res) {
	var obj;
	obj = fs.readFileSync(__dirname + "/games/" + req.params.game + "/" + req.params.game + '.json', 'utf8');
	obj = JSON.parse(obj);
	res.send(obj.purchase);
});

myApp.post('/send/:game/:number', function (req, res) {
	var obj;
	obj = fs.readFileSync(__dirname + "/games/" + req.params.game + "/" + req.params.game + '.json', 'utf8');
	obj = JSON.parse(obj);
	res.send(obj.calls[req.params.number - 1]);
});

var server = myApp.listen(8081, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Example app listening at http://%s:%s", host, port);
});


