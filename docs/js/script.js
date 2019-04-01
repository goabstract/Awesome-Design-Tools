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

const automaticScroll = () => {
	const nav = document.querySelector('.nav ul');
	const articles = document.querySelectorAll('main > article');
	const articleFourthChild = document.querySelectorAll('main > article:nth-child(8n)');
	document.addEventListener('scroll', () => {
		const bodyHeight = document.body.offsetHeight;
		const bodyScrollTop = document.body.scrollTop;
		const navHeight = nav.getBoundingClientRect().height;
		const quarterOfNavHeight = navHeight / 4;

		const res = (bodyScrollTop / bodyHeight) * 100;
		if (res > 20 && res < 40) {
			nav.scrollTop = quarterOfNavHeight;
		} else if (res > 40 && res < 55) {
			nav.scrollTop = navHeight * 0.8;
		} else if (res > 55 && res < 70) {
			nav.scrollTop = navHeight * 1.35;
		} else if (res > 70 && res < 85) {
			nav.scrollTop = navHeight * 1.5;
		} else if (res > 85 && res < 100) {
			nav.scrollTop = navHeight * 2;
		} else {
			nav.scrollTop = 0;
		}
	})
}
automaticScroll();
