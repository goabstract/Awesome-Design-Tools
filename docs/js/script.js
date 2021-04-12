const chooseMd = document.location.href
  .split('/')
  .pop()
  .includes('plugin')
  ? 'Plugins'
  : 'Tools';

function toggleMenuChange() {
  document.querySelector('.nav').classList.toggle('nav--visible');
  document
    .querySelector('.hamburger-menu')
    .classList.toggle('hamburger-menu--change');
}

document.querySelector('.hamburger-menu').onclick = function() {
  toggleMenuChange();
};

document.querySelectorAll('.nav a').forEach(link => {
  if (window.innerWidth < 959) {
    link.onclick = function() {
      toggleMenuChange();
    };
  }
});

class Nav {
  constructor(navElements, activeClass) {
    this.navElements = document.querySelectorAll(navElements);
    this.activeClass = activeClass;
  }

  scroll() {
    const { navElements, activeClass } = this;
    navElements.forEach(navLink => {
      const sectionId = navLink.getAttribute('href');
      document.addEventListener('scroll', () => {
        const sectionDom = document.querySelector(sectionId),
          sectionRect = sectionDom.getBoundingClientRect(),
          { top, bottom, height } = sectionRect;

        if ((bottom > 96 && top + height >= 96 && top < 96) || top == 96) {
          navLink.classList.add(activeClass);
        } else {
          navLink.classList.remove(activeClass);
        }
      });
    });
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
  });
};
automaticScroll();

// search input
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

document
  .querySelector('.js-search-input')
  .addEventListener('input', function(e) {
    document.removeEventListener('scroll', automaticScroll, true);
    ('use strict');

    const inputContent = e.target.value;
    const paragraphs = document.querySelectorAll('main .tool');
    const banner = document.querySelectorAll('.banner');
    const promoBanner = document.querySelectorAll('.promo-banner');
    const articleHeaders = document.querySelectorAll('main article > header');
    // const addendum = document.querySelector('#addendum');
    const welcome = document.querySelector('.welcome');
    const promotionBanner = document.querySelectorAll(
      '.promotion-banner-wrapper'
    );
    const elementsToHide = [
      ...banner,
      ...promoBanner,
      ...articleHeaders,
      welcome,
      ...promotionBanner
    ];

    if (inputContent.length > 0) {
      elementsToHide.forEach(banner => banner.classList.add('-hidden'));
    } else if (inputContent.length === 0) {
      elementsToHide.forEach(banner => banner.classList.remove('-hidden'));
    }

    function handle(text) {
      const bool =
        inputContent || inputContent.capitalize() || inputContent.toUpperCase();
      if (text.innerHTML.search(bool) >= 0) {
        text.classList.remove('-hidden');
      } else {
        text.classList.add('-hidden');
      }
    }

    paragraphs.forEach(text => handle(text));
  });

// add event for nav button when clicking on it while searching

document.querySelectorAll('.nav a').forEach(button =>
  button.addEventListener('click', e => {
    e.preventDefault();
    if (window.innerWidth)
      // make an empty input
      document.querySelector('.js-search-input').value = '';

    // scroll a bit less due to nav fixed positioning
    window.scrollTo(
      0,
      document.querySelector(e.target.getAttribute('href')).offsetTop - 90
    );
  })
);

// handle modal window for filtering by application
if (document.querySelector('.js-open-modal-filter')) {
  document
    .querySelector('.js-open-modal-filter')
    .addEventListener('click', e => {
      e.target.classList.toggle('-active');
      document.querySelector('.sort-tool-modal').classList.toggle('-hidden');
    });
}

// filter by application logic
function sortByApplication(event) {
  // toggle styles for button that was handled;
  const { target } = event;
  target.classList.toggle('-active');

  const targetAttr = target.getAttribute('app');
  const allLabels = document.querySelectorAll(`.label[for="${targetAttr}"]`);
  const buttons = [
    ...document.querySelectorAll('.sort-tool-modal__btn-choose')
  ];

  const sortedButtons = buttons.filter(button =>
    button.classList.contains('-active')
  );
  const activeApps = sortedButtons.map(button => button.getAttribute('app'));

  ga(
    'send',
    'event',
    `Awesome design ${chooseMd} - Filter (State of Platforms)`,
    'Click',
    activeApps.join('-')
  );
  ga(
    'send',
    'event',
    `Awesome design ${chooseMd} - Filter (Clicked Platform Name)`,
    'Click',
    targetAttr
  );

  allLabels.forEach(label => {
    const toolContainer =
      label.parentElement.parentElement.parentElement.parentElement;
    const list = toolContainer.parentElement;
    const sectionContainer = list.parentElement;
    const attr = label.getAttribute('for');
    if (activeApps.includes(attr)) {
      toolContainer.classList.remove('-hidden');
    } else {
      toolContainer.classList.add('-hidden');
    }

    const arr = [...list.children].filter(
      tool => !tool.classList.contains('-hidden')
    );
    if (arr.length === 0) {
      sectionContainer.classList.add('-hidden');
    } else {
      sectionContainer.classList.remove('-hidden');
    }
  });
}

document
  .querySelectorAll('.sort-tool-modal__btn-choose')
  .forEach(button => button.addEventListener('click', sortByApplication));

document.querySelectorAll('.tool').forEach(tool => {
  tool.addEventListener(
    'click',
    e => {
      e.stopPropagation();
      const target = e.currentTarget;
      const title = target.children[1].children[0].children[0].textContent;
      const categoryName = target.parentElement.parentElement.id;
      const platforms = [
        ...target.children[1].children[0].children[1].children
      ].map(a => a.getAttribute('for'));

      ga(
        'send',
        'event',
        `Awesome design ${chooseMd} - Plugin (Title)`,
        'Click',
        title
      );
      ga(
        'send',
        'event',
        `Awesome design ${chooseMd} - Plugin (CategoryName)`,
        'Click',
        categoryName
      );
      ga(
        'send',
        'event',
        `Awesome design ${chooseMd} - Plugin (Platform)`,
        'Click',
        platforms.join('-')
      );
    },
    true
  );
});

document.querySelectorAll('.nav ul li a').forEach(a => {
  a.addEventListener(
    'click',
    e => {
      const { target } = e;
      const title = target.innerText;

      ga(
        'send',
        'event',
        ` Awesome design ${chooseMd} - Category (Title)`,
        'Click',
        title
      );
    },
    true
  );
});

if (window.innerWidth >= 960) {
  const active = document.querySelector('.header-top__nav-item.-active');
  document.querySelectorAll('.header-top__nav-item').forEach(a => {
    a.onmouseover = e => {
      if (!e.target.classList.contains('-active')) {
        active.classList.remove('-open');
      } else {
        e.target.classList.add('-open');
      }
    };

    a.onmouseout = e => {
      if (!active.classList.contains('-open')) {
        active.classList.add('-open');
      }
    };
  });
}

const showBannerTop = () => {
  const sEl = el => document.querySelector(el);

  setTimeout(() => {
    sEl('.header-top').classList.remove('header-top--hide-banner');
  }, 0);
  // if (window.innerWidth < 768) {
  //   sEl('.nav-container').removeClass('nav-container--hide-banner')
  // }

  sEl('.banner__close').onclick = () => {
    sEl('.header-top').classList.add('header-top--hide-banner');
  };
};
showBannerTop();
