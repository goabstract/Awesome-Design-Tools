const fs = require(`fs`);
const md = new require('markdown-it')('commonmark');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


let indexPage = ``;

const someBanner = `
	<div class="banner">
		Hello there!
	</div> 
`;
	
const config = {
	markdownFile: `./README.md`,
	markdownToHtmlName: `docs/components/main.html`,
	index: `./docs/index.html`,
	components: [
		`docs/components/header.html`,
		`docs/components/main.html`,
		`docs/components/footer.html`
	],
};

const writeHtml = (html) => {
	const { filenameForMarkdownHtml } = config;
	fs.writeFile(markdownToHtmlName, html, function(err, data) {
	  if (err) console.log(err);
	  console.log(`transpiling md to html.`);
	  createIndexPage();
	});
}

const readMarkdown = new Promise((resolve, reject) => {
	const { markdownFile } = config;
	fs.readFile(markdownFile, (err, data) => {
		console.log(`getting md file`);
		const mdData = data.toString();
		const html = md.render(mdData);
		resolve(html);
	})
});

const readFile = (fileName) => (
	new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', function (error, data) {
      if (error) return reject(error);
      indexPage += data;
      console.log(`pasting ${fileName}`);
      resolve();
    })
  })
);

async function createIndexPage() {
	const { components, index } = config;
	await readFile(components[0]);
	await readFile(components[1]);
	await readFile(components[2]);
	await fs.writeFile(index, indexPage, (err, data) => {
	  if (err) console.log(err);
	  console.log(`wrote index page`);
	})
}

const parseTweaks = (html) => {
		const dom = new JSDOM(html);
		const { document } = dom.window;
		const { window } = dom;

		// add flawlessFeedback banner
		createBanner(window);

		// add a pointer for navigation
		// addActiveArticle(window);

		// add links for nav & tools
		addIDsForHeadings(window);
		addLinksToNavigationElements(window);

		tweakDescriptionOfArticleTopic(window);

		// modify DOM for easier positioning
		tweakToolContainer(window);

		addHamburgerMenu(window);

		addWelcomeArticle(window);

		return document.documentElement.outerHTML;
}

const createBanner = ({ document }) => {
		const banner = document.createElement('a');
		banner.classList.add('promo-banner');
		banner.classList.add('promo-banner--flawless-feedback');
		banner.href="https://flawlessapp.io/feedback";
		banner.innerHTML = `
			<div class="promo-banner__logo promo-banner--flawless-feedback__logo"></div>
			<div class="promo-banner__description promo-banner--flawless-feedback__description">
				<h3>Leave feedback on iOS apps</h3>
				<p>Turn UI issues & Bugs<br> Into Jira tickets or Trello cards</p>
			</div>
			<div class="promo-banner__button promo-banner--flawless-feedback__button" href="https://flawlessapp.io/feedback">Request Access</div>
		`;
		const bannerParent = document.querySelector('#user-flow-tools');
		bannerParent.appendChild(banner);
}

const tweakToolContainer = ({ document }) => {
	const toolsContainer = document.querySelectorAll('article li');
	toolsContainer.forEach((tool) => {
		tool.classList.add('tool');
		// wrap description into a paragraph
		const title = tool.innerHTML.split(' — ')[0];
		console.log(`tool:
			${tool.innerHTML}`);
		const descriptionFromMarkdown = tool.innerHTML.split(' — ')[1];
		descriptionFromMarkdown.charAt(0).toUpperCase();
		const description = `<p>${descriptionFromMarkdown}</p>`;

		tool.innerHTML = `
			<div class="tool__asset"></div>
			<div class="tool__description">
				${title}
				${description}
			</div>
		`;
	});
}

const tweakDescriptionOfArticleTopic = ({ document }) => {
	const topics = document.querySelectorAll('main > article');
	topics.forEach(topic => topic.innerHTML = `
		<header>${topic.innerHTML.split('<ul>')[0]}</header>
		<ul>
			${topic.innerHTML.split('<ul>')[1]}
		</ul>
	`);
}

const addActiveArticle = ({ document }) => {
	const firstNavigationElement = document.querySelector('.nav li');
	firstNavigationElement.classList.add('active');
}

const addIDsForHeadings = ({ document }) => {
	const categoryTitles = document.querySelectorAll('body > h3');
	categoryTitles.forEach(title => title.id = title.innerHTML.toLowerCase().split(' ').join('-'));
}

const addLinksToNavigationElements = ({ document }) => {
	const navListLinks = document.querySelectorAll('.nav li a');
	navListLinks.forEach((item) => {
		const oldHref = item.href;
		item.href = `#${oldHref.split(`#`)[1]}`;
	})
}

const addWelcomeArticle = ({ document }) => {
	const main = document.querySelector('body > main');
	const article = document.createElement('article');
	article.classList.add('welcome');
	article.innerHTML = `
		<div class="welcome__asset">Awesome Design Tools logo</div>
		<h1 class="welcome__title">Awesome Design Tools</h1>
		<p class="welcome__description">
			The best design tools for everything collected by the community in Open Source GitHub repository.
			Content being curated by <a href="https://twitter.com/LisaDziuba">Lisa Dziuba</a> and <a href="https://twitter.com/ValiaHavryliuk">Valia Havruliyk</a> from Flawless App.
		</p>
		<a href="https://github.com/LisaDziuba/Awesome-Design-Tools" class="btn welcome__btn image-gh">Contribute on GitHub</a>
	`;
	main.insertBefore(article, main.childNodes[0]);
}

const addHamburgerMenu = ({ document }) => {
	const body = document.querySelector('body');
	const hamburger = document.createElement('div');
	hamburger.classList.add('hamburger-menu');
	hamburger.innerHTML = `
		<div class="bar1"></div>
		<div class="bar2"></div>
		<div class="bar3"></div>
	`;
	body.appendChild(hamburger);
}

Promise.all([readMarkdown])
	.then(res => parseTweaks(res))
	.then(res => writeHtml(res));
