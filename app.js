/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
	console.log("server starting on " + appEnv.url);
});

var mysql = require('mysql');
var connection = mysql.createConnection({
	host	: 'us-cdbr-iron-east-03.cleardb.net',
	user	: 'beffb49c35eb8a',
	password: '00145932',
	database: 'ad_701aaf7318de853'
});

connection.connect(function(err){
	if (err){
		console.error('error connecting: ' + err.stack);
		return;
	}
	console.log('connected as id ' + connection.threadId);

	connection.query('SELECT * FROM test', function(err, rows, fields, res, req){
		console.error(err);
		console.log(rows);
		
	});
});

app.get("/data", function(req, res){
	connection.query('SELECT * FROM test', function(err, rows, fields){
		res.send(rows);
	});
});

app.get("/id", function(req, res){
	connection.query('SELECT id FROM test', function(err, rows, fields){
		res.send(rows);
	});
});

app.get("/first", function(req, res){
	connection.query('SELECT firstname FROM test', function(err, rows, fields){
		res.send(rows);
	});
});

app.get("/last", function(req, res){
	connection.query('SELECT lastname FROM test', function(err, rows, fields){
		res.send(rows);
	});
});