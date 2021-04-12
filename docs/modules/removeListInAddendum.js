const removeListInAddendum = ({ document }) => {
	const article = document.querySelector('#addendum');
	if (article) {
		const lists = article.querySelectorAll('ul');
		lists.forEach((list) =>
			list.innerHTML.includes('undefined') &&
				list.parentNode.removeChild(list)
		);
	}
}

module.exports = removeListInAddendum;
