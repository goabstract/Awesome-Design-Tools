const PromotionBanner = (modifier) => `
    <a class="promotion-banner ${modifier.className}" href="${modifier.link.href}">
        <div class="promotion-banner__logo ${modifier.logo}">
            ${
               modifier.hasImage ? `
                    <img src="https://flawlessapp.io/images/designtools/porkbun/porkbun-logo.png"
                        srcset="https://flawlessapp.io/images/designtools/porkbun/porkbun-logo@2x.png 2x,
                        https://flawlessapp.io/images/designtools/porkbun/porkbun-logo@3x.png 3x"
                        class="porkbun-logo"
                    >
               ` : ``
            }
        </div>
        <div class="promotion-banner__main">
            <h3 class="promotion-banner__title">${modifier.title}</h3>
            <p class="promotion-banner__description">
                ${modifier.description}
            </p>
        </div>
        <button
            class="promotion-banner__link ${modifier.link.className}"
        >
            ${modifier.link.text}
        </button>
    </a>
`;

const createSponsorsBanner = ({ document }, modifier, bannerParents) => {
    const banner = document.createElement('div');
    banner.classList.add('promotion-banner-wrapper');
    banner.innerHTML = PromotionBanner(modifier);

    try {
        bannerParents.map(parent => document.querySelector(parent) && document.querySelector(parent).appendChild(banner.cloneNode(true)));
    } catch(err) {
        console.log(err);
    } 
}

module.exports = createSponsorsBanner;
