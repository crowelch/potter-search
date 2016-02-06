var _ = require('lodash');

exports.getContext = function(sourceText, indices, query) {
	var contextObj = {
		results: []
	};

	sourceText = sourceText.toString();

	return new Promise(function(resolve, reject) {
		_.forEach(indices, function(value, key) {
			console.log(value, key);

			var result = {};

			if(value - 100 < 0) {
				result.preText = removeHalfWordStart(sourceText.substr(0, value));
			} else {
				result.preText = removeHalfWordStart(sourceText.substr(value - 100, 100));
			}
			result.postText = removeHalfWordEnd(sourceText.substr(value + query.length, 100));
			result.text = '<strong>' + query + '</strong>';

			contextObj.results.push(result);
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
