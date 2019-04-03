const addHamburgerMenu = ({ document }) => {
	const body = document.querySelector('body');
	const hamburger = document.createElement('div');
	hamburger.classList.add('hamburger-menu');
	hamburger.innerHTML = `
		<div class="bar1"></div>
		<div class="bar2"></div>
		<div class="bar3"></div>
	`;
	body.appendChild(hamburger);
}

module.exports = addHamburgerMenu;
