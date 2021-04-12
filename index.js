const fs = require('fs');
const md = new require('markdown-it')('commonmark');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const minify = require('html-minifier').minify;

const editHead = require('./docs/modules/editHead');
const addIDsForHeadings = require('./docs/modules/addIDsForHeadings');
const addLinksToNavigationElements = require('./docs/modules/addLinksToNavigationElements');
const tweakDescriptionOfArticleTopic = require('./docs/modules/tweakDescriptionOfArticleTopic');
const tweakToolContainer = require('./docs/modules/tweakToolContainer');
const addHamburgerMenu = require('./docs/modules/addHamburgerMenu');
const addWelcomeArticle = require('./docs/modules/addWelcomeArticle');
const addScripts = require('./docs/modules/addScripts');
const deleteAllIconsInDescription = require('./docs/modules/helpers/deleteAllIconsInDescription');
const addBackgroundColorToLogo = require('./docs/modules/addBackgroundColorToLogo');
const removeAllImages = require('./docs/modules/helpers/removeAllImages');
const addContributeButtonForAddendum = require('./docs/modules/addContributeButtonForAddendum');
const removeListInAddendum = require('./docs/modules/removeListInAddendum');
const addHeader = require('./docs/modules/addHeader');
const addAllPromoBanners = require('./docs/modules/addAllPromoBanners');


const designToolsConfig = require('./docs/modules/config/tools.js');
const designPluginsConfig = require('./docs/modules/config/plugins.js');
const uiKitsConfig = require('./docs/modules/config/ui-kits.js');

const writeHtml = (html, fileToWrite, isProduction = true) => {
	const minified = minify(html, {
		removeAttributeQuotes: true,
		minifyCSS: true,
		minifyJS: true,
		collapseWhitespace: true,
		removeComments: true,
	});
	const chooseVersion = isProduction ? minified : html;
	fs.writeFile(fileToWrite, html, function(err, data) {
	  if (err) console.log(err);
	  console.log(`transpiled md to html`);
	});
}

const readMd = (mdFile) => new Promise((resolve, reject) => {
	fs.readFile(mdFile, (err, data) => {
		console.log(`got md file`);
		const mdData = data.toString();
		const html = md.render(mdData);
		resolve(html);
	})
});

const parseTweaks = (html, config) => {
		const dom = new JSDOM(html);
		const { document } = dom.window;
		const { window } = dom;

		const {
			title,
			head,
			bodyColorScheme,
			logoClassName,
			nav,
			welcomeArticle,
		} = config;

		const isTool = document.querySelector('h1').textContent.split(' ')[2] === 'Tools' ? true : false;
		const isPlugin = document.querySelector('h1').textContent.includes('Plugin') ? true : false;
		const isKit = document.querySelector('h1').textContent.includes('Kits') ? true : false;

		console.log(document.querySelector('h1').textContent, isKit);

		// add color scheme
		document.body.classList.add(bodyColorScheme);

		// tweak dom
		editHead(window, head.title, head.meta, head.favicon, process.env.PRODUCTION);
		addIDsForHeadings(window);
		addLinksToNavigationElements(window);
		tweakDescriptionOfArticleTopic(window);
		tweakToolContainer(window);
		addHeader(window, title, logoClassName, nav, isTool, isPlugin, isKit);
		addHamburgerMenu(window);
		addWelcomeArticle(window, welcomeArticle);
		addScripts(window);
		deleteAllIconsInDescription(window);
		addBackgroundColorToLogo(window);
		removeAllImages(window);
		addContributeButtonForAddendum(window);
		removeListInAddendum(window);
		addAllPromoBanners(window);
		return document.documentElement.outerHTML;
}

Promise.all([readMd(designToolsConfig.markdownFile)])
	.then(res => parseTweaks(res, designToolsConfig.main))
	.then(res => writeHtml(res, designToolsConfig.index, true))

	.then(() => Promise.all([readMd(designPluginsConfig.markdownFile)]))
	.then(res => parseTweaks(res, designPluginsConfig.main))
	.then(res => writeHtml(res, designPluginsConfig.index, false))

	.then(() => Promise.all([readMd(uiKitsConfig.markdownFile)]))
	.then(res => parseTweaks(res, uiKitsConfig.main))
	.then(res => writeHtml(res, uiKitsConfig.index, false))