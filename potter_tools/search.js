var async = require('async');
var _ = require('lodash');

function search(textToSearch, textToFind, cb) {
	var indicesFound = [];
	var position = 0;

	textToSearch = textToSearch.toLowerCase();
	textToFind = textToFind.toLowerCase();

	while(position !== -1) {
		position = textToSearch.indexOf(textToFind, position + 1);
		indicesFound.push(position);
	}

	// Last element appears to always be -1, so remove it. Hack, I know.
	indicesFound.pop();

	cb(indicesFound);
}

exports.searchAllBooks = function(books, query) {
	var results = [];

	return new Promise(function(resolve, reject) {
		async.each(books, function(book, cb) {
			search(book.text, query, function(indices) {
				results.push({
					indices: indices,
					book: book.bookNumber
				});

				cb();
			});
		}, function(err) {
			if(err) {
				console.log(err);
			} else {
				resolve(results);
			}
		});
	});
}
