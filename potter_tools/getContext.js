var _ = require('lodash');

const CONTEXT = 200

exports.getContext = function(sourceText, indices, query) {
	var contextObj = {
		results: []
	};

	sourceText = sourceText.toString();

	return new Promise(function(resolve, reject) {
		_.forEach(indices, function(value, key) {
			console.log(value, key);

			var result = {};

			if(value - CONTEXT < 0) {
				result.preText = removeHalfWordStart(sourceText.substr(0, value));
			} else {
				result.preText = removeHalfWordStart(sourceText.substr(value - CONTEXT, CONTEXT));
			}
			result.postText = removeHalfWordEnd(sourceText.substr(value + query.length, CONTEXT));
			result.text = '<strong>' + query + '</strong>';

			contextObj.results.push(result);
		});

		resolve(contextObj);
	});
}

exports.getAllContexts = function(sources, indices, query) {
	var contextObj = {
		results: []
	};

	return new Promise(function(resolve, reject) {
		_.forEach(indices, function(outerIndex, place) {
			console.log(outerIndex);
			_.forEach(sources.books, function(v, k) {
				console.log(v.bookNumber, outerIndex.book);
				if(v.bookNumber === outerIndex.book) {
					_.forEach(outerIndex.indices, function(value, key) {
						console.log(value, key);

						var result = {};

						// console.log(v.text);

						if(value - CONTEXT < 0) {
							result.preText = removeHalfWordStart(v.text.substr(0, value));
						} else {
							result.preText = removeHalfWordStart(v.text.substr(value - CONTEXT, CONTEXT));
						}
						result.postText = removeHalfWordEnd(v.text.substr(value + query.length, CONTEXT));
						result.text = '<strong>' + query + '</strong>';
						result.book = v.title;

						contextObj.results.push(result);
					});
				}
			});
		});

		resolve(contextObj);
	});
}

function removeHalfWordStart(text) {
	var arr = text.split(' ');
	arr.shift();//remove first element
	var newText = '';
	for(var i = 0; i < arr.length; i++) {
		newText += arr[i];
		if(i < arr.length - 1) {
			newText += ' ';
		}
	}
	return newText;
}

function removeHalfWordEnd(text) {
	var arr = text.split(' ');
	arr.pop();//remove last element
	var newText = '';
	for(var i = 0; i < arr.length; i++) {
		newText += arr[i];
		if(i < arr.length - 1) {
			newText += ' ';
		}
	}
	return newText;
}
