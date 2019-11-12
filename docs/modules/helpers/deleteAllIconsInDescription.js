const deleteAllIconsInDescription = ({ document }) => {
	const toolDescription = document.querySelectorAll('.tool__description p img');
	toolDescription.forEach((image) => image.parentNode.removeChild(image));
}

module.exports = deleteAllIconsInDescription;
