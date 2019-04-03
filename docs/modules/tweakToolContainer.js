const capitalizeFirstLetter = (string) => (
    string.charAt(0).toUpperCase() + string.slice(1)
);

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