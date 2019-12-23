const capitalizeFirstLetter = (string) => (
    string.charAt(0).toUpperCase() + string.slice(1)
);

const removeEmojis  = string => {
	const regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|[\ud83c[\ude50\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
	return string.replace(regex, '');
}

const makeTextLogo = (unsplittedTitle) => {
	let titleObject = removeEmojis(unsplittedTitle).split('">')[1].split('</a')[0].split(' ');
	let result = '';
	if (titleObject.length > 1) {
		result = titleObject[0].slice(0, 1) + titleObject[1].slice(0, 1);
	} else {
		result = titleObject[0].slice(0, 1);
	}

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

const createLabel = (title, className) => `
	<div
		class="label label--${className}"
		title="this plugin is for ${title}"
		for="${className}"
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

const addLabel = (tool) => {
	const { innerHTML } = tool;
	const check = (tag) => innerHTML.includes(tag);
	let result = [];
	const push = (title, className) => result.push(createLabel(title, className));

	if (check('alt="sketch.svg"') || check('alt="Sketch"')) {
		push('Sketch', 'sketch');
	}
	if (check('alt="figma.svg"') || check('alt="Figma"')) {
		push('Figma', 'figma');
	}
	if (check('alt="adobe-xd.svg"') || check('alt="Adobe XD"')) {
		push('Adobe XD', 'xd');
	}
	if (check('alt="Mobile"')) {
		push('Mobile', 'mobile');
	}
	if (check('alt="Desktop"')) {
		push('Desktop', 'desktop');
	}
	if (check('alt="Web"')) {
		push('Web', 'web');
	}
	if (check('alt="Photoshop"')) {
		push('Photoshop', 'photoshop');
	}
	return result.join(' ');
}

const tweakToolContainer = ({ document }) => {
	const toolsContainer = document.querySelectorAll('article li');
	toolsContainer.forEach((tool) => {
		tool.classList.add('tool');
		// wrap description into a paragraph
		const title = tool.innerHTML.split(' — ')[0];
		const targetBlankTitle = `${title.split('">')[0]}" target="_blank">${title.split('">')[1]}`
		const descriptionFromMarkdown = tool.innerHTML.split(' — ')[1];
		const description = `<p>${capitalizeFirstLetter(descriptionFromMarkdown)}</p>`;
		let toolLink = title.split('href="')[1].split('"')[0];
		// const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/;
		tool.innerHTML = `
			<a href="${toolLink}" class="tool__asset" target="_blank">${makeTextLogo(title)}</a>
			<div class="tool__description">
				<header class="tool__description__header">
					${targetBlankTitle}
					<div class="label-wrapper">
						${addLabel(tool)}
					</div>
				</header>
				${description}
				<div class="tag-wrapper">
					${addTag(tool)}
				</div>
			</div>
		`;

	});
}

module.exports = tweakToolContainer;