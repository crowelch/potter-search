var fs = require('fs');
var pasync = require('pasync');

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

exports.loadBooks = function(data) {
	var newBooks = {
		books:[]
	};

	return new Promise(function(resolve, reject) {
		pasync.each(data.books, loadFile).then(function(book) {
			console.log(book);
			books.push(book);
		}).then(function() {

		});
	});
}
