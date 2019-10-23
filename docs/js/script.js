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

				if (bottom > 96 && top + height >= 96 && top < 96 || top == 96) {
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

// search input

String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1)
}

document.querySelector('.js-search-input').addEventListener('input', function(e) {
	document.removeEventListener('scroll', automaticScroll, true)
	'use strict';

	const inputContent = e.target.value;
	const paragraphs = document.querySelectorAll('main .tool');
	const banner = document.querySelectorAll('.banner');
	const promoBanner = document.querySelectorAll('.promo-banner');
	const articleHeaders = document.querySelectorAll('main article > header');
	// const addendum = document.querySelector('#addendum');
	const welcome = document.querySelector('.welcome');
	const promotionBanner = document.querySelectorAll('.promotion-banner-wrapper');
	const elementsToHide = [...banner, ...promoBanner, ...articleHeaders, welcome, ...promotionBanner];
	
	if (inputContent.length > 0) {
		elementsToHide.forEach(banner => banner.classList.add('-hidden'));
	} else if (inputContent.length === 0) {
		elementsToHide.forEach(banner => banner.classList.remove('-hidden'));
	}

	function handle(text) {
		const bool = inputContent || inputContent.capitalize() || inputContent.toUpperCase();
		if (text.innerHTML.search(bool) >= 0) {
			text.classList.remove('-hidden');
		} else {
			text.classList.add('-hidden')
		}
	}

	paragraphs.forEach(text => handle(text))
})

// add event for nav button when clicking on it while searching

document.querySelectorAll('.nav a').forEach(button =>
	button.addEventListener('click', (e) => {
		e.preventDefault();
		// make empty input
		document.querySelector('.js-search-input').value = '';

		// scroll a bit less due to nav fixed positioning
		window.scrollTo(0, document.querySelector(e.target.getAttribute('href')).offsetTop - 90);

		const banner = document.querySelectorAll('.banner');
		const promoBanner = document.querySelectorAll('.promo-banner');
		const articleHeaders = document.querySelectorAll('main article > header');
		// const addendum = document.querySelector('#addendum');
		const welcome = document.querySelector('.welcome');
		const elementsToHide = [...banner, ...promoBanner, ...articleHeaders, welcome];
		const paragraphs = document.querySelectorAll('main .tool');

		// back to default view
		elementsToHide.forEach(banner => banner.classList.remove('-hidden'));
		paragraphs.forEach(p => p.classList.remove('-hidden'));
	})
);

// handle modal window for filtering by application

document.querySelector('.js-open-modal-filter').addEventListener('click', (e) => {
	e.target.classList.toggle('-active');
	document.querySelector('.sort-tool-modal').classList.toggle('-hidden')
});

// filter by application logic

function sortByApplication(event) {
	// toggle styles for button that was handled;
	const { target } = event;
	target.classList.toggle('-active');

	const targetAttr = target.getAttribute('app');
	const allLabels = document.querySelectorAll(`.label[for="${targetAttr}"]`);
    const buttons = [...document.querySelectorAll('.sort-tool-modal__btn-choose')];
    const targetIsActive = target.classList.contains('-active');

    const sortedButtons = buttons.filter(button => button.classList.contains('-active'))
    const activeApps = sortedButtons.map(button => button.getAttribute('app'));

	allLabels.forEach((label) => {
		const toolContainer = label.parentElement.parentElement.parentElement.parentElement;
		const list = toolContainer.parentElement;
		const sectionContainer = list.parentElement;
        const attr = label.getAttribute('for');
        if (activeApps.includes(attr)) {
            toolContainer.classList.remove('-hidden');
        } else {
            toolContainer.classList.add('-hidden');
		}
		// const arr = [...toolContainer.parentElement].filter(tool => !tool.classList.contains('hidden'));
		// console.log(toolContainer.parentElement.childElementCount);
		const arr = [...list.children].filter((tool) => !tool.classList.contains('-hidden'));
		if (arr.length === 0) {
			sectionContainer.classList.add('-hidden');
		} else {
			sectionContainer.classList.remove('-hidden');
		}
	});


}


document.querySelectorAll('.sort-tool-modal__btn-choose').forEach((button) => {
	button.addEventListener('click', sortByApplication);
})
