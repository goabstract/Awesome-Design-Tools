const HtmlParts = require('./HtmlParts');

const createPromoBanner = ({ document }, link = 'https://flawlessapp.io/feedback') => {
    const banner = document.createElement('a');
    const { promoFlawlessFeedbackBanner } = HtmlParts;
    banner.classList.add('promo-banner');
    banner.classList.add('promo-banner--flawless-feedback');
    banner.href = link;
    banner.innerHTML = promoFlawlessFeedbackBanner;

    const bannerParents = [
        '#accessibility-tools',
        '#visual-debugging-tools',
        '#screenshot-software',
    ];

    bannerParents.map(parent => document.querySelector(parent).appendChild(banner.cloneNode(true)));
}

module.exports = createPromoBanner;
