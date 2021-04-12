const addHamburgerMenu = ({ document }) => {
	const parent = document.querySelector('.header-inner');
	const hamburger = document.createElement('div');
	hamburger.classList.add('hamburger-menu');
	hamburger.innerHTML = `
		<div class="bar1"></div>
		<div class="bar2"></div>
		<div class="bar3"></div>
	`;
	parent.appendChild(hamburger);
}

module.exports = addHamburgerMenu;
