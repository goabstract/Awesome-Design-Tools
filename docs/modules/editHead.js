const Templates = require('./Templates');

const editHead = ({ document }, title, meta, icons, isProduction) => {
	const head = document.querySelector('head');
    const {
        createTitle,
        createMeta,
        createIcons,
        fonts,
        styleInner,
        styleExternal,
        analytics,
    } = Templates;

    if (isProduction !== false) {
        head.innerHTML = `
            ${createTitle(title)}
            ${createMeta(meta)}
            ${createIcons(icons)}
            ${styleInner}
            ${fonts}
            ${analytics}
        `;
    } else {
        head.innerHTML = `
            ${createTilte(title)}
            ${createMeta(meta)}
            ${createIcons(icons)}
            ${fonts}
            ${styleExternal}
        `;        
    }
}

module.exports = editHead;
