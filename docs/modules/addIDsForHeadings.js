const createLinkForID = require('./helpers/createLinkForID');

const addIDsForHeadings = ({ document }) => {
	const categoryTitles = document.querySelectorAll('body > h3');
	categoryTitles.forEach(title => title.id = createLinkForID(title.innerHTML));
}

module.exports = addIDsForHeadings;
