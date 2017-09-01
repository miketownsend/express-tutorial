const express = require('express'),
	bodyParser = require('body-parser'),
  path = require('path'),
  restRouter = require('./rest'),
  fs = require('fs'),
  instruments = require('./data/instruments');

const app = express();

// Handle missing files
app.use(function (req, res, next) {
  console.log(req.originalUrl);
  next();
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse text
app.use(bodyParser.text({ type: 'text/*' }));
app.use(bodyParser.text({ type: 'application/xml' }));

// parse application/json
app.use(bodyParser.json())

app.use(function (req, res, next) {
	req.user = { name: "mike" };
	next();
})

app.use('/nav_test', function (req, res) {
	console.log(req.body);
	fs.writeFileSync('./export-output.xml', req.body);
	res.send(200)
})

app.use('/resources', function (req, res) {
	res.sendFile(path.join(__dirname, req.originalUrl));
});

app.use('/api/instruments', restRouter);

app.use('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.use(function (req, res) {
	res.status(404).send('Page not found');
})

app.use(function (err, req, res, next) {
	console.log(err);
	res.status(500).send('something broke');
})

app.listen(3000, function () {
  console.log(`Syft API listening on port 3000`);
});

