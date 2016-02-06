var fs = require('fs');
var async = require('async');
var _ = require('lodash');

exports.loadFile = function(book) {
	// console.log('filename', book.filename);
	return new Promise(function(resolve, reject) {
		fs.readFile(book.filename, 'utf-8', (err, data) => {
			if(err) {
				reject(err);
				console.log(err);
			} else {
				book.text = data;
				resolve(book);
			}
		});
	});
}

exports.loadBooks = function(potters) {
	return new Promise(function(resolve, reject) {
		var books = [];

		async.each(potters.books, function(book, cb) {
			fs.readFile(book.filename, 'utf-8', (err, data) => {
				if(err) {
					console.log(err);
				} else {
					book.text = data;
					books.push(book);
				}

				cb();
			});
		}, function(err) {
			if(err) {
				console.log(err);
			} else {
				resolve(books);
			}
		});
	});
}
