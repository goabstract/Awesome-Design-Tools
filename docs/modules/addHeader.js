const addHeader = (
  { document },
  title = 'Awesome Design Tools',
  logo,
  nav,
  isTool = false,
  isPlugin = false,
  isKit = false
) => {
  const header = document.querySelector('.header-top');
  header.classList.add('header-top--hide-banner');
  const { loop } = nav;

  const defineProductName = () =>
    (isTool && `Awesome Design Tools`) ||
    (isPlugin && `Awesome Design Plugins`) ||
    (isKit && `Awesome Design Kits`);

  header.innerHTML = `
        <div class="banner-top banner-abstract">
            <header>
                <div class="abstract-logo"></div>
                <a href="http://flawlessapp.io/designtools/joinsabstract" class="banner__text">
                    ${defineProductName()} as a part of Flawless App family joins Abstract!
                </a>
            </header>
            <footer class="banner__close-wrapper">
                <button class="banner__close">Close Banner</button>
            </footer>
        </div>
        <div class="header-inner">
            <div class="logo">
                <div class="logo__asset ${logo}"></div>
                <div class="logo__title">${title}</div>
            </div>
            <nav class="header-top__nav">${loop
              .map(
                item => `
                    <a
                        href=${item.href}
                        class="header-top__nav-item ${item.className} ${
                  item.isActive ? '-open -active' : ''
                }"
                    >
                        <span>${item.title}</span>
                    </a>
                `
              )
              .join(' ')}
            </nav>
            ${
              isTool
                ? `
                    <input type="text" placeholder="Search for tool…" class="header-top__input-search js-search-input">
                `
                : ``
            }
            ${
              isPlugin
                ? `
                    <div class="header-top__view-setup">
                        <input type="text" placeholder="Search for plugin…" class="header-top__input-search js-search-input">
                        <button type="button" class="header-top__sort-tool-btn js-open-modal-filter -mint">Filter</button>
                        <div class="header-top__sort-tool-modal sort-tool-modal -hidden">
                            <h5 class="sort-tool-modal__title">Show plugins for:</h5>
                            <form class="sort-tool-modal__nav">
                                <button type="button" class="sort-tool-modal__btn-choose -sketch label--sketch -active" app="sketch">Sketch</button>
                                <button type="button" class="sort-tool-modal__btn-choose -figma label--figma -active" app="figma">Figma</button>
                                <button type="button" class="sort-tool-modal__btn-choose -xd label--xd -active" app="xd">Adobe XD</button>
                            </form>
                        </div>
                    </div>  
                `
                : ``
            }
            ${
              isKit
                ? `
                    <div class="header-top__view-setup">
			            <input type="text" placeholder="Search for plugin…" class="header-top__input-search js-search-input">
                        <button type="button" class="header-top__sort-tool-btn js-open-modal-filter -violet">Filter</button>
                        <div class="header-top__sort-tool-modal sort-tool-modal -hidden">
                            <h5 class="sort-tool-modal__title">Show plugins for:</h5>
                            <form class="sort-tool-modal__nav">
                                <button type="button" class="sort-tool-modal__btn-choose -sketch label--sketch -active" app="sketch">Sketch</button>
                                <button type="button" class="sort-tool-modal__btn-choose -figma label--figma -active" app="figma">Figma</button>
                                <button type="button" class="sort-tool-modal__btn-choose -xd label--xd -active" app="xd">Adobe XD</button>
                                <button type="button" class="sort-tool-modal__btn-choose -photoshop label--photoshop -active" app="photoshop">Photoshop</button>
                                <button type="button" class="sort-tool-modal__btn-choose -mobile label--mobile -active" app="mobile">Mobile</button>
                                <button type="button" class="sort-tool-modal__btn-choose -desktop label--desktop -active" app="desktop">Desktop</button>
                                <button type="button" class="sort-tool-modal__btn-choose -web label--web -active" app="web">Web</button>
                                </form>
                        </div>
			        </div>    
                `
                : ``
            }
        </div>
	`;
};

module.exports = addHeader;
