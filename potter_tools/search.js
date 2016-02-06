exports.search = function(textToSearch, textToFind) {
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

	return Promise.resolve(indicesFound);
}
