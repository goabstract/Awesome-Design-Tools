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
            <input type="text" placeholder="Search for ${isTool ? 'tool' : 'plugin'}…" class="header-top__input-search js-search-input">
        </div>
	`;
}

module.exports = addHeader;
