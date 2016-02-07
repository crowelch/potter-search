var express = require('express');
var router = express.Router();
var url = require('url');
var file = require('../potter_tools/fileUtils');
var search = require('../potter_tools/search');
var getContext = require('../potter_tools/getContext');

/* GET home page. */

router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Potter Search'
	});
});

//all the books
router.get('/result', function(req, res, next) {
	var query = req.query.search;
	var queryLength = query.length;
	var resultLength = 0;

	file.loadBooks(sevenPotters).then(function(booksWithText) {
		sevenPotters.books = booksWithText;
		return booksWithText;
	}).then(function(data) {
		return search.searchAllBooks(data, query);
	}).then(function(indices) {
		indices.forEach(function(wand) {
			resultLength += wand.indices.length;
		});

		if(resultLength > 0) {
			return getContext.getAllContexts(sevenPotters, indices, query);
		} else {
			return { noResults: true };
		}
	}).then(function(outputObject) {
		outputObject.query = query;
		outputObject.numResults = resultLength;
		res.render('result', outputObject);
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
		filename: __dirname + '/../txt/hp_order_of_the_phoenix.txt',
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
