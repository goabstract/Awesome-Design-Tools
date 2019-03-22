const fs = require('fs');
const path = require('path');
const md = new require('markdown-it')('commonmark');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const minify = require('html-minifier').minify;
const image = require('./docs/modules/image');

const config = {
	markdownFile: `./README.md`,
	index: `./docs/index.html`,
}

const writeHtml = (html) => {
	const { index } = config;
	const minified = minify(html, {
		removeAttributeQuotes: true,
		minifyCSS: true,
		minifyJS: true,
		collapseWhitespace: true,
	});
	fs.writeFile(index, minified, function(err, data) {
	  if (err) console.log(err);
	  console.log(`transpiled md to html`);
	});
}

const readMarkdown = new Promise((resolve, reject) => {
	const { markdownFile } = config;
	fs.readFile(markdownFile, (err, data) => {
		console.log(`got md file`);
		const mdData = data.toString();
		const html = md.render(mdData);
		resolve(html);
	})
});

const parseTweaks = (html) => {
		const dom = new JSDOM(html);
		const { document } = dom.window;
		const { window } = dom;

		editHead(window, 'Awesome Design Tools', '#0054d7');

		// add flawlessFeedback banner
		createBanner(window);
		createContributeBanner(window);
		// add pointer for navigation
		// addActiveArticle(window);

		// add links for nav & tools
		addIDsForHeadings(window);
		addLinksToNavigationElements(window);

		tweakDescriptionOfArticleTopic(window);

		// modify DOM for easier positioning
		tweakToolContainer(window);

		addHamburgerMenu(window);

		addWelcomeArticle(window);

		addScripts(window);

		deleteAllIconsInDescription(window);

		return document.documentElement.outerHTML;
}

const getCssFile = (file) => (
	fs.readFileSync(path.normalize(`${__dirname}/docs/css/${file}.css`), 'utf8')
)

const getJS = () => (
	fs.readFileSync(path.normalize(`${__dirname}/docs/js/script.js`), 'utf8')
)

const editHead = ({ document }, title, themeColor) => {
	const head = document.querySelector('head');
	const normalizeCss = getCssFile('normalize');
	const mainCss = getCssFile('design-tools-style');
	const {
		favicon196,
		favicon160,
		favicon152,
		favicon144,
		favicon120,
		favicon114,
		favicon96,
		favicon76,
		favicon72,
		favicon60,
		favicon57,
		favicon32,
		favicon16
	} = image;

	const icons = `
		<link rel="icon" type="image/png" href="${favicon196}" sizes="196x196">
		<link rel="icon" type="image/png" href="${favicon160}" sizes="160x160">
		<link rel="icon" type="image/png" href="${favicon96}" sizes="96x96">
		<link rel="icon" type="image/png" href="${favicon16}" sizes="16x16">
		<link rel="icon" type="image/png" href="${favicon32}" sizes="32x32">
		<link rel="apple-touch-icon" sizes="57x57" href="${favicon57}">
		<link rel="apple-touch-icon" sizes="114x114" href="${favicon114}">
		<link rel="apple-touch-icon" sizes="72x72" href="${favicon72}">
		<link rel="apple-touch-icon" sizes="144x144" href="${favicon144}">
		<link rel="apple-touch-icon" sizes="60x60" href="${favicon60}">
		<link rel="apple-touch-icon" sizes="120x120" href="${favicon120}">
		<link rel="apple-touch-icon" sizes="76x76" href="${favicon76}">
		<link rel="apple-touch-icon" sizes="152x152" href="${favicon152}">
	`;

	head.innerHTML = `
		<title>${title}</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="theme-color" content="${themeColor}">
		<meta name="description" content="A description of the page">
		${icons}
		<link href="https://fonts.googleapis.com/css?family=Montserrat:400,600i,700" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css?family=Lato:700" rel="stylesheet">
		<link rel="stylesheet" href="css/normalize.css">
		<link rel="stylesheet" href="css/design-tools-style.css">
	`;
	// head.innerHTML = `
	// 	<title>${title}</title>
	// 	<meta charset="utf-8">
	// 	<meta name="viewport" content="width=device-width, initial-scale=1">
	// 	<meta name="theme-color" content="${themeColor}">
	// 	<meta name="description" content="A description of the page">
	// 	${icons}
	// 	<link href="https://fonts.googleapis.com/css?family=Montserrat:400,600i,700" rel="stylesheet">
	// 	<link href="https://fonts.googleapis.com/css?family=Lato:700" rel="stylesheet">
	// 	<style>
	// 		${normalizeCss}
	// 		${mainCss}
	// 	</style>
	// `;
}

const addScripts = ({ document }) => {
	const scriptTag = document.createElement('script');
	scriptTag.innerHTML = getJS();
	document.querySelector('body').appendChild(scriptTag);
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
		const bannerParent = document.querySelector('#accessibility-tools');
		bannerParent.appendChild(banner);
}

const createContributeBanner = ({ document }) => {
	const banner = document.createElement('div');
	banner.classList.add('banner');
	banner.classList.add('banner--flex');
	banner.classList.add('banner--dark');
	banner.classList.add('banner-contribute');
	banner.innerHTML = `
		<p>Didn't find your favorite tool?</p>
		<a href="https://github.com/LisaDziuba/Awesome-Design-Tools" class="btn btn-contribute image-gh">Contribute on GitHub</a>
	`;
	const categoriesToPushBanner = ['#collaboration-tools', '#ui-design-tools'];
	categoriesToPushBanner.forEach(id => {
		document.querySelector(id).appendChild(banner)
	});
}

const createTag = (title, className) => `
	<div
		class="tag tag--${className}"
		title="this tool is ${title !== 'Mac only' ? title.toLowerCase() : `for Mac users only`}"
	>
		${title}
	</div>
`;

const addTag = (tool) => {
	const { innerHTML } = tool;
	const check = (tag) => innerHTML.includes(tag);
	let result = [];
	const push = (title, className) => result.push(createTag(title, className));
	if (check('alt="open-source')) {
		push('Open Source', 'open-source');
	}
	if (check('alt="free')) {
		push('Free', 'free');
	}
	if (check('alt="mac')) {
		push('Mac only', 'mac');
	}
	return result.join(' ');
}

const makeTextLogo = (unsplittedTitle) => {
	const titleObject = unsplittedTitle.split('>')[1].split('</a')[0].split(' ');
	if (titleObject.length === 1) {
		return titleObject[0].slice(0, 1);
	}
	let result = [];
	titleObject.map((word) => {
		if (word === titleObject[0]) {
			result.push(word[0])
		} else if (word[0].toUpperCase() === word[0]) {
			result.push(word[0]);
		}
	})
	return result[0] + result[1];
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const tweakToolContainer = ({ document }) => {
	const toolsContainer = document.querySelectorAll('article li');
	toolsContainer.forEach((tool) => {
		tool.classList.add('tool');
		// wrap description into a paragraph
		const title = tool.innerHTML.split(' — ')[0];
		const descriptionFromMarkdown = tool.innerHTML.split(' — ')[1];
		const description = `<p>${capitalizeFirstLetter(descriptionFromMarkdown)}</p>`;
		const toolLink = title.split('href="')[1].split('"')[0];
		tool.innerHTML = `
			<a href="${toolLink}" class="tool__asset">${makeTextLogo(title)}</a>
			<div class="tool__description">
				<header class="tool__description__header">
					${title}
					<div class="tag-wrapper">
						${addTag(tool)}
					</div>
				</header>
				${description}
			</div>
		`;

	});
}

const createLinkForID = (str) => (
	str.toLowerCase().split(' ').join('-')
)

const tweakDescriptionOfArticleTopic = ({ document }) => {
	const topics = document.querySelectorAll('main > article');
	topics.forEach((topic) => {
		const splittedHeader = topic.innerHTML.split('<ul>');
		const toolTitle = splittedHeader[0].split('</h3>')[0].slice(4);
		topic.innerHTML = `
			<header>
				<h3><a href="#${createLinkForID(toolTitle.slice(1))}"${toolTitle}</a></h3>
				${splittedHeader[0].split('</h3>')[1] && splittedHeader[0].split('</h3>')[1]}
			</header>
			<ul>
				${topic.innerHTML.split('<ul>')[1]}
			</ul>
		`;
	});
}

const addActiveArticle = ({ document }) => {
	const firstNavigationElement = document.querySelector('.nav li');
	firstNavigationElement.classList.add('active');
}

const addIDsForHeadings = ({ document }) => {
	const categoryTitles = document.querySelectorAll('body > h3');
	categoryTitles.forEach(title => title.id = createLinkForId(title.innerHTML));
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
			The best design tools for everything collected by the community.
			Content being curated by Flawless App.
		</p>
		<a href="https://github.com/LisaDziuba/Awesome-Design-Tools" class="btn btn-contribute image-gh">Contribute on GitHub</a>
	`;
	// <a href="https://twitter.com/LisaDziuba">Lisa Dziuba</a> and <a href="https://twitter.com/ValiaHavryliuk">Valia Havruliyk</a> from
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

const deleteAllIconsInDescription = ({ document }) => {
	const toolDescription = document.querySelectorAll('.tool__description p img');
	toolDescription.forEach((image) => image.parentNode.removeChild(image));
}

Promise.all([readMarkdown])
	.then(res => parseTweaks(res))
	.then(res => writeHtml(res));
