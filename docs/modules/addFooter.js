const addFooter = ({ document }) => {
	const footer = document.createElement('footer');
	footer.innerHTML = `
		<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script>
		<script>
		  WebFont.load({
		    google: {
		      families: ['Montserrat:400,600i,700', 'Lato:700']
		    }
		  });
		</script>
	`;
	document.body.appendChild(footer);
}

module.exports = addFooter;
