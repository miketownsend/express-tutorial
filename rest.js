const express = require('express');
const instruments = require('./data/instruments');

var router = express.Router();

router.get('/', function (req, res) {
	res.send(instruments);
})

router.get('/:build_id', function (req, res) {
	console.log(req.params);
	var instrument = instruments.find(function (i) { return i.build == req.params.build_id });
	if( !instrument ) {
		return res.status(404).send('Could not find instrument with build ' + req.params.build_id);
	}

	res.send(instrument);	
})

router.put('/:build_id', function (req, res) {
	var instrument = instruments.find(function (i) { return i.build == req.params.build_id });
	if( !instrument ) {
		return res.status(404).send('Could not find instrument with build ' + req.params.build_id);
	}

	console.log(req.body);
	
	instrument.customer = req.body.customer || instrument.customer;
	instrument.build = req.body.build || instrument.build;
	instrument.product = req.body.product || instrument.product;

	res.send(instrument);
})

module.exports = router;
