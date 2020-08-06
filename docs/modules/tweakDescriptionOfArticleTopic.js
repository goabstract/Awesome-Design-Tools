const createLinkForID = require('./helpers/createLinkForID');

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

module.exports = tweakDescriptionOfArticleTopic;
