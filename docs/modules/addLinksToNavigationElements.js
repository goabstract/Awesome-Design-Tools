const addLinksToNavigationElements = ({ document }) => {
	const navListLinks = document.querySelectorAll('.nav li a');
	navListLinks.forEach((item) => {
		const oldHref = item.href;
		item.href = `#${oldHref.split(`#`)[1]}`;
	});
}

module.exports = addLinksToNavigationElements;
