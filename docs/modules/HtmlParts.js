const getCssFile = require('./getCssFile');
const CONFIG = require('./CONFIG');

const {
    favicon196,
    favicon160,
    favicon152,
    favicon144,
    favicon120,
    favicon114,
    favicon96,
    favicon76,
    favicon72,
    favicon60,
    favicon57,
    favicon32,
    favicon16,
} = require('./image'); 

const normalizeCss = getCssFile('normalize');
const mainCss = getCssFile('design-tools-style');
const {
    title,
    description,
    themeColor,
    promoFlawlessFeedbackBanner__title,
    promoFlawlessFeedbackBanner__description,
    promoFlawlessFeedbackBanner__link,
} = CONFIG;

const HtmlParts = {
    analytics: `
        <!-- Google Analytics -->
        <script>
            window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
            ga('create', 'UA-63048232-1', 'auto');
            ga('send', 'pageview');
        </script>
        <script async src='https://www.google-analytics.com/analytics.js'></script>

        <!-- Facebook Pixel Code -->
        <script>
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1844132335637828');
            fbq('track', 'PageView');
        </script>
    `,
    promoFlawlessFeedbackBanner: `
        <div class="promo-banner__logo promo-banner--flawless-feedback__logo"></div>
        <div class="promo-banner__description promo-banner--flawless-feedback__description">
            <h3>${promoFlawlessFeedbackBanner__title}</h3>
            <p>${promoFlawlessFeedbackBanner__description}</p>
        </div>
        <div
            class="promo-banner__button promo-banner--flawless-feedback__button"
            href="${promoFlawlessFeedbackBanner__link}">Request Access</div>
    `,
    icons: `
        <link rel="icon" type="image/png" href="${favicon196}" sizes="196x196">
        <link rel="icon" type="image/png" href="${favicon160}" sizes="160x160">
        <link rel="icon" type="image/png" href="${favicon96}" sizes="96x96">
        <link rel="icon" type="image/png" href="${favicon16}" sizes="16x16">
        <link rel="icon" type="image/png" href="${favicon32}" sizes="32x32">
        <link rel="apple-touch-icon" sizes="57x57" href="${favicon57}">
        <link rel="apple-touch-icon" sizes="114x114" href="${favicon114}">
        <link rel="apple-touch-icon" sizes="72x72" href="${favicon72}">
        <link rel="apple-touch-icon" sizes="144x144" href="${favicon144}">
        <link rel="apple-touch-icon" sizes="60x60" href="${favicon60}">
        <link rel="apple-touch-icon" sizes="120x120" href="${favicon120}">
        <link rel="apple-touch-icon" sizes="76x76" href="${favicon76}">
        <link rel="apple-touch-icon" sizes="152x152" href="${favicon152}">
    `,
    title: `<title>${title}</title>`,
    meta: `
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="${themeColor}">
        <meta name="description" content="The best design tools for everything — from wireframing and prototyping to animation, accessibility, AR, design systems and sound design.">
        <meta name="image" content="https://flawlessapp.io/images/designtools/awesome-design-tools-sharable-image-general.png">
        <!-- Schema.org for Google -->
        <meta itemprop="name" content="Awesome Design Tools">
        <meta itemprop="description" content="The best design tools for everything — from wireframing and prototyping to animation, accessibility, AR, design systems and sound design.">
        <meta itemprop="image" content="https://flawlessapp.io/images/designtools/awesome-design-tools-sharable-image-general.png">
        <!-- Twitter -->
        <meta name="twitter:card" content="summary">
        <meta name="twitter:title" content="Awesome Design Tools">
        <meta name="twitter:description" content="The best design tools for everything — from wireframing and prototyping to animation, accessibility, AR, design systems and sound design.">
        <meta name="twitter:site" content="https://flawlessapp.io/designtools">
        <meta name="twitter:creator" content="@flawlessappio">
        <!-- Open Graph general (Facebook, Pinterest & Google+) -->
        <meta name="og:title" content="Awesome Design Tools">
        <meta name="og:description" content="The best design tools for everything — from wireframing and prototyping to animation, accessibility, AR, design systems and sound design.">
        <meta name="og:image" content="https://flawlessapp.io/images/designtools/awesome-design-tools-sharable-image-facebook.png">
        <meta name="og:url" content="https://flawlessapp.io/designtools">
        <meta name="og:site_name" content="Awesome Design Tools">
        <meta name="fb:admins" content="1685880598347240">
        <meta name="og:type" content="website">
    `,
    styleExternal: `
        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/design-tools-style.css">
    `,
    styleInner: `
        <style>
            ${normalizeCss}
            ${mainCss}
        </style>
    `,
};

module.exports = HtmlParts;
