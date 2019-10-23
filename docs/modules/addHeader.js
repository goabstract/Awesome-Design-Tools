const addHeader = (
    { document },
    title = 'Awesome Design Tools',
    logo,
    nav,
    isTool,
) => {
    const header = document.querySelector('.header-top');
    const { loop } = nav;

    header.innerHTML = `
        <div class="header-inner">
            <div class="logo">
                <div class="logo__asset ${logo}"></div>
                <div class="logo__title">${title}</div>
            </div>
            <nav class="header-top__nav">${
                loop.map((item) => `
                    <a
                        href=${item.href}
                        class="header-top__nav-item ${item.className} ${item.isActive ? '-active' : ''}"
                    >
                        ${item.title}
                    </a>
                `).join(' ')
            }
            </nav>
            ${
                isTool ? `
                    <input type="text" placeholder="Search for tool…" class="header-top__input-search js-search-input">
                ` : `
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
            }
        </div>
	`;
}

module.exports = addHeader;
