const capitalizeFirstLetter = (string) => (
    string.charAt(0).toUpperCase() + string.slice(1)
);

const makeTextLogo = (unsplittedTitle) => {
	const words = unsplittedTitle.split('>')[1].split('</a')[0].split(' ');
	
	const result = words
		.map(word => word[0])
		.filter(character => character === character.toUpperCase())
		.slice(0, 2)
		.join('');

	return result;
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

module.exports = tweakToolContainer;