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
const deleteAllIconsInDescription = require('./docs/modules/helpers/deleteAllIconsInDescription');
const addBackgroundColorToLogo = require('./docs/modules/addBackgroundColorToLogo');
const removeAllImages = require('./docs/modules/helpers/removeAllImages');
const addContributeButtonForAddendum = require('./docs/modules/addContributeButtonForAddendum');
const removeListInAddendum = require('./docs/modules/removeListInAddendum');
const addHeader = require('./docs/modules/addHeader');
const promotionBanner = require('./docs/modules/view/promotionBanner');


const designToolsConfig = require('./docs/modules/CONFIG.js');
const designPluginsConfig = require('./docs/modules/config/plugins.js');

const writeHtml = (html, fileToWrite, isProduction = true) => {
	const minified = minify(html, {
		removeAttributeQuotes: true,
		minifyCSS: true,
		minifyJS: true,
		collapseWhitespace: true,
		removeComments: true,
	});
	const chooseVersion = isProduction ? minified : html;
	fs.writeFile(fileToWrite, minified, function(err, data) {
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

		// add color scheme
		document.body.classList.add(bodyColorScheme);

		// tweak dom
		editHead(window, head.title, head.meta, head.favicon, process.env.PRODUCTION);
		createPromoBanner(window);
		addIDsForHeadings(window);
		addLinksToNavigationElements(window);
		tweakDescriptionOfArticleTopic(window);
		tweakToolContainer(window);
		addHamburgerMenu(window);
		addWelcomeArticle(window, welcomeArticle);
		addScripts(window);
		deleteAllIconsInDescription(window);
		addBackgroundColorToLogo(window);
		removeAllImages(window);
		addContributeButtonForAddendum(window);
		removeListInAddendum(window);
		addHeader(window, title, logoClassName, nav, isTool);
		promotionBanner(
			window,
			{
				className: '-supernova',
				logo: '-supernova',
				title: 'SuperNova',
				description: 'Convert any mobile design into full-fledged native applications',
				link: {
					href: 'http://bit.ly/2ZwUoEq',
					className: '-supernova',
					text: 'Try Supernova Studio',
				},
			},
			[
				'#code-export', '#collaboration', '#developers-handoff',
				'#design-to-code-tools', '#collaboration-tools'
			]
		);
		promotionBanner(
			window,
			{
				className: '-abstract',
				logo: '-abstract',
				title: 'Abstract',
				description: 'We centralize design decisions, feedback, Sketch files, and specs for your team.',
				link: {
					href: 'http://bit.ly/2VS36Zl',
					className: '-abstract',
					text: 'Get a free, 14-day trial',
				},
			},
			[
				'#version-control', '#plugin-development',
				'#ui-design-tools', '#design-version-control', '#design-system-tools'
			]
		);
		promotionBanner(
			window,
			{
				className: '-protopie',
				logo: '-protopie',
				title: 'ProtoPie',
				description: 'Interactive prototyping for all digital products',
				link: {
					href: 'http://bit.ly/33KtOpN',
					className: '-protopie',
					text: 'Try for Free',
				},
			},
			[
				'#prototyping', '#plugins-collection',
				'#prototyping-tools', '#mockup-tools', '#user-flow-tools'
			]
		);
		promotionBanner(
			window,
			{
				className: '-maze',
				logo: '-maze',
				title: 'Maze',
				description: 'Maze is a user testing platform that turns your prototype into actionable insights.',
				link: {
					href: 'http://bit.ly/35I1q9q',
					className: '-maze',
					text: 'Try for Free',
				},
			},
			[
				'#analytics-and-user-research', '#user-flows',
				'#experience-monitoring', '#user-research-tools'
			]
		);
		promotionBanner(
			window,
			{
				className: '-porkbun',
				logo: '-porkbun',
				title: 'Get your free .design domain name!',
				description: `Thinking of building your portfolio? .design is like .com, and .net, but it's more relevant to what you do as a designer.`,
				hasImage: true,
				// image1x: 'https://flawlessapp.io/images/designtools/porkbun/porkbun-logo.png',
				// image2x: 'https://flawlessapp.io/images/designtools/porkbun/porkbun-logo@2x.png',
				// image3x: 'https://flawlessapp.io/images/designtools/porkbun/porkbun-logo@3x.png',
				link: {
					href: 'http://bit.ly/2VQVTJ8',
					className: '-porkbun',
					text: 'Get 1-year Free',
				},
			},
			[
				'#website-and-html-export', '#code-highlight', '#presentation-and-preview',
				'#screenshot-software', '#design-inspiration', '#illustrations'
			]
		);
		promotionBanner(
			window,
			{
				className: '-xd',
				logo: '-xd',
				title: 'Adobe XD',
				description: 'Design at the speed of thought.',
				link: {
					href: 'https://adobe.ly/33HVSdf',
					className: '-xd',
					text: 'Get a free, 14-day trial',
				},
			},
			[
				'#generate-ui-element', '#accesibility',
				'#animation-tools', '#tools-for-learning-design', '#design-handoff-tools'
			]
		);
		return document.documentElement.outerHTML;
}

Promise.all([readMd(designToolsConfig.markdownFile)])
	.then(res => parseTweaks(res, designToolsConfig.main))
	.then(res => writeHtml(res, designToolsConfig.index, true))
	.then(() => Promise.all([readMd(designPluginsConfig.markdownFile)]))
	.then(res => parseTweaks(res, designPluginsConfig.main))
	.then(res => writeHtml(res, designPluginsConfig.index, false));