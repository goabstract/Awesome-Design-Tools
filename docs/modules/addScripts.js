const fs = require('fs');
const path = require('path');

const getJS = () => (
	fs.readFileSync(path.normalize(`${__dirname}/../js/script.js`), 'utf8')
)

const addScripts = ({ document }) => {
	const scriptTag = document.createElement('script');
	scriptTag.innerHTML = getJS();
	document.querySelector('body').appendChild(scriptTag);
}

module.exports = addScripts;
