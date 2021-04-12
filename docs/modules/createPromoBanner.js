const Templates = require('./Templates');

const createPromoBanner = ({ document }, link = 'https://flawlessapp.io/feedback') => {
    const banner = document.createElement('a');
    const { promoFlawlessFeedbackBanner } = Templates;
    banner.classList.add('promo-banner');
    banner.classList.add('promo-banner--flawless-feedback');
    banner.href = link;
    banner.innerHTML = promoFlawlessFeedbackBanner;

    const bannerParents = [
        '#accessibility-tools',
        '#user-research-tools',
        '#prototyping-tools',
        '#visual-debugging-tools',
    ];

    try {
        bannerParents.map(parent => document.querySelector(parent) && document.querySelector(parent).appendChild(banner.cloneNode(true)));
    } catch(err) {
        console.log(err);
    } 

}

module.exports = createPromoBanner;
