const createLinkForID = (str) => (
	str.toLowerCase().split(' ').join('-')
)

module.exports = createLinkForID;
