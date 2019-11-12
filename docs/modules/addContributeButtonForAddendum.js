const addContributeButtonForAddendum = ({ document }) => {
	const article = document.querySelector('#addendum');
	const button = document.createElement('a');
	button.href = 'https://github.com/LisaDziuba/Awesome-Design-Tools';
	const classNames = ['btn', 'btn-contribute', 'image-gh'];
	classNames.map(className => button.classList.add(className));
	button.innerHTML = 'Contribute on GitHub';
	if (article) {
		article.appendChild(button);
	}
}

module.exports = addContributeButtonForAddendum;
