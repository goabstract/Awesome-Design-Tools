const HtmlParts = require('./HtmlParts');

const editHead = ({ document }, isProduction) => {
	const head = document.querySelector('head');
    const {
        title,
        meta,
        icons,
        styleInner,
        styleExternal,
        analytics
    } = HtmlParts;

    if (isProduction !== false) {
        head.innerHTML = `
            ${title}
            ${meta}
            ${icons}
            ${styleInner}
            ${analytics}
        `;
    } else {
        head.innerHTML = `
            ${title}
            ${meta}
            ${icons}
            ${styleExternal}
        `;        
    }
}

module.exports = editHead;
