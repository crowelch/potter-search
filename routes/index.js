var express = require('express');
var router = express.Router();
var url = require('url');
var file = require('../potter_tools/fileUtils');
var search = require('../potter_tools/search').search;
var getContext = require('../potter_tools/getContext').getContext;

/* GET home page. */

router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Potter Search'
	});
});

router.get('/result', function(req, res, next) {
	var query = req.query.search;
	var queryLength = query.length;
	var booksWithText;

	console.log('query', query);
	console.log('length', queryLength);

	// console.log('wat', sevenPotters.books[0]);

	file.loadFile(sevenPotters.books[0]).then(function(data) {
		// sevenPotters = data;
		booksWithText = data;
		return data;
	}).then(function(data) {
		return search(data.text, query);
	}).then(function(indices) {
		if(indices.length > 0) {
			return getContext(sevenPotters.books[0].text, indices, query);
		} else {
			console.log('no results');
			return {
				error: 'No results found'
			}
		}
		// res.send(sevenPotters.books[0].text.substr(indices[0], queryLength));
		// res.send(indices);
	}).then(function(contextWords) {
		console.dir(contextWords);
		res.render('result', contextWords);
	});
});

module.exports = router;

var sevenPotters = {
	books: [{
		title: 'Harry Potter and the Sorcerer\'s Stone',
		filename: __dirname + '/../txt/hp_sorcerers_stone.txt',
		bookNumber: 1
	}, {
		title: 'Harry Potter and the Chamber of Secrets',
		filename: __dirname + '/../txt/hp_chamber_of_secrets.txt',
		bookNumber: 2
	}, {
		title: 'Harry Potter and the Prisoner of Azkaban',
		filename: __dirname + '/../txt/hp_prisoner_of_azkaban.txt',
		bookNumber: 3
	}, {
		title: 'Harry Potter and the Goblet of Fire',
		filename: __dirname + '/../txt/hp_goblet_of_fire.txt',
		bookNumber: 4
	}, {
		title: 'Harry Potter and the Order of the Phoenix',
		filename: __dirname + '/../txt/hp_order_of_phoenix.txt',
		bookNumber: 5
	}, {
		title: 'Harry Potter and the Half Blood Prince',
		filename: __dirname + '/../txt/hp_half_blood_prince.txt',
		bookNumber: 6
	}, {
		title: 'Harry Potter and the Deathly Hallows',
		filename: __dirname + '/../txt/hp_deathly_hallows.txt',
		bookNumber: 7
	}
]};
