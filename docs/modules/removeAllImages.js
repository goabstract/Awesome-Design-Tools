const removeAllImages = ({ document }) => {
	for (let i= document.images.length; i-->0;)
    document.images[i].parentNode.removeChild(document.images[i]);
}

module.exports = removeAllImages;
