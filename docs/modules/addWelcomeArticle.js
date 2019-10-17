const addWelcomeArticle = (
	{ document },
	{
		logoClassName,
		title,
		description,
		button,
	}
) => {
	const main = document.querySelector('body > main');
	const article = document.createElement('article');
	article.classList.add('welcome');
	article.innerHTML = `
		<div class="welcome__asset ${logoClassName}"></div>
		<h1 class="welcome__title">${title}</h1>
		<p class="welcome__description">
			${description}
		</p>
		<a href="${button.href}" class="btn btn-contribute image-gh">Contribute on GitHub</a>
	`;
	main.insertBefore(article, main.childNodes[0]);
}

module.exports = addWelcomeArticle;
