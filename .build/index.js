'use strict';
const electron = require('electron');
const app = electron.app;
var express = require('express');
var myApp = express();
var fs = require('fs');

// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 600,
		height: 400
	});

	win.loadURL(`file://${__dirname}/index.html`);
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});

myApp.get('/', function (req, res) {
		console.log("Got a GET request for the homepage");
		res.send('Hello GET');
	});

myApp.get('/connect/:game', function (req, res) {
		var obj;
		fs.readFile("games/" + req.params.game + "/" + req.params.game+'.json', 'utf8', function (err, data) {
			if (err) throw err;
			obj = JSON.parse(data);
			res.send(obj.connect);
		});
	});

myApp.post('/send/:game/auth', function (req, res) {
		var obj;
		fs.readFile("games/" + req.params.game + "/" + req.params.game+'.json', 'utf8', function (err, data) {
			if (err) throw err;
			obj = JSON.parse(data);
			res.send(obj.auth);
		});
	});

myApp.post('/send/:game/purchase', function (req, res) {
		var obj;
		fs.readFile("games/" + req.params.game + "/" + req.params.game+'.json', 'utf8', function (err, data) {
			if (err) throw err;
			obj = JSON.parse(data);
			res.send(obj.purchase);
		});
	});

myApp.post('/send/:game/:number', function (req, res) {
		var obj;
		fs.readFile("games/" + req.params.game + "/" + req.params.game+'.json', 'utf8', function (err, data) {
			if (err) throw err;
			obj = JSON.parse(data);
			res.send(obj.calls[req.params.number - 1]);
		});
	});

	var server = myApp.listen(8081, function () {
		var host = server.address().address;
		var port = server.address().port;
		console.log("Example app listening at http://%s:%s", host, port);
	});


