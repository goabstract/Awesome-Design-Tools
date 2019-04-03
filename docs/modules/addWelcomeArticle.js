const addWelcomeArticle = ({ document }) => {
	const main = document.querySelector('body > main');
	const article = document.createElement('article');
	article.classList.add('welcome');
	article.innerHTML = `
		<div class="welcome__asset">Awesome Design Tools logo</div>
		<h1 class="welcome__title">Awesome Design Tools</h1>
		<p class="welcome__description">
			The best design tools for everything.
			Curated by Lisa Dziuba & Valia Havruliyk from <a href="https://flawlessapp.io/feedback">Flawless team</a>.
		</p>
		<a href="https://github.com/LisaDziuba/Awesome-Design-Tools" class="btn btn-contribute image-gh">Contribute on GitHub</a>
	`;
	main.insertBefore(article, main.childNodes[0]);
}

module.exports = addWelcomeArticle;
