const fs = require('fs');
const md = new require('markdown-it')('commonmark');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const minify = require('html-minifier').minify;

const editHead = require('./docs/modules/editHead');
const createPromoBanner = require('./docs/modules/createPromoBanner');
const addIDsForHeadings = require('./docs/modules/addIDsForHeadings');
const addLinksToNavigationElements = require('./docs/modules/addLinksToNavigationElements');
const tweakDescriptionOfArticleTopic = require('./docs/modules/tweakDescriptionOfArticleTopic');
const tweakToolContainer = require('./docs/modules/tweakToolContainer');
const addHamburgerMenu = require('./docs/modules/addHamburgerMenu');
const addWelcomeArticle = require('./docs/modules/addWelcomeArticle');
const addScripts = require('./docs/modules/addScripts');
const deleteAllIconsInDescription = require('./docs/modules/deleteAllIconsInDescription');
const addBackgroundColorToLogo = require('./docs/modules/addBackgroundColorToLogo');
const removeAllImages = require('./docs/modules/removeAllImages');
const addContributeButtonForAddendum = require('./docs/modules/addContributeButtonForAddendum');
const removeListInAddendum = require('./docs/modules/removeListInAddendum');
const addFooter = require('./docs/modules/addFooter');

const config = {
	markdownFile: `./README.md`,
	index: `./docs/index.html`,
}

const writeHtml = (html, isProduction = process.env.PRODUCTION) => {
	const { index } = config;
	const minified = minify(html, {
		removeAttributeQuotes: true,
		minifyCSS: true,
		minifyJS: true,
		collapseWhitespace: true,
	});
	const chooseVersion = () => {
		if (isProduction) {
			return minified;
		} else {
			return html;
		}
	}
	fs.writeFile(index, chooseVersion(), function(err, data) {
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

		editHead(window, process.env.PRODUCTION);
		createPromoBanner(window);
		addIDsForHeadings(window);
		addLinksToNavigationElements(window);
		tweakDescriptionOfArticleTopic(window);
		tweakToolContainer(window);
		addHamburgerMenu(window);
		addWelcomeArticle(window);
		addScripts(window);
		deleteAllIconsInDescription(window);
		addBackgroundColorToLogo(window);
		removeAllImages(window);
		addContributeButtonForAddendum(window);
		removeListInAddendum(window);
		addFooter(window);

		return document.documentElement.outerHTML;
}

Promise.all([readMarkdown])
	.then(res => parseTweaks(res))
	.then(res => writeHtml(res));
