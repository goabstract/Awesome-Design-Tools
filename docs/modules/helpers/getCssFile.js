const fs = require('fs');
const path = require('path');

const getCssFile = (file) => (
	fs.readFileSync(path.normalize(`${__dirname}/../../css/${file}.css`), 'utf8')
)

module.exports = getCssFile;
