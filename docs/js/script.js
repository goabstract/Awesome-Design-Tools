function toggleMenuChange() {
	document.querySelector('.nav').classList.toggle('nav--visible');
	document.querySelector('.hamburger-menu').classList.toggle('hamburger-menu--change');
}

document.querySelector('.hamburger-menu').onclick = function() {
	toggleMenuChange();
}

document.querySelectorAll('.nav a').forEach((link) => {
	if (window.innerWidth < 959) {
		link.onclick = function() {
			toggleMenuChange();
		}
	}
});

class Nav {
	constructor(navElements, activeClass) {
		this.navElements = document.querySelectorAll(navElements);
		this.activeClass = activeClass;
	}

	scroll() {
		const { navElements, activeClass } = this;
		navElements.forEach((navLink) => {
			const sectionId = navLink.getAttribute('href');
			document.addEventListener('scroll', () => {
				const sectionDom = document.querySelector(sectionId),
							sectionRect = sectionDom.getBoundingClientRect(),
							{ top, bottom, height } = sectionRect;

				if (bottom > 1 && top + height >= 0 && top < 1 || top == 0) {
					navLink.classList.add(activeClass)
				} else {
					navLink.classList.remove(activeClass);
				}
			})
		})
	}

}

const bookmark = new Nav('.nav a', 'active');
bookmark.scroll();
