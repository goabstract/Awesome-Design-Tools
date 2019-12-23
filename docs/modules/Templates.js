const getCssFile = require('./helpers/getCssFile');
const CONFIG = require('./config/tools');

const normalizeCss = getCssFile('normalize');
const mainCss = getCssFile('design-tools-style');
const {
    promoFlawlessFeedbackBanner__title,
    promoFlawlessFeedbackBanner__description,
    promoFlawlessFeedbackBanner__link,
} = CONFIG;

const Templates = {
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
    createIcons: (favicon) => `
        <link rel="icon" type="image/png" href="${favicon['196']}" sizes="196x196">
        <link rel="icon" type="image/png" href="${favicon['160']}" sizes="160x160">
        <link rel="icon" type="image/png" href="${favicon['96']}" sizes="96x96">
        <link rel="icon" type="image/png" href="${favicon['16']}" sizes="16x16">
        <link rel="icon" type="image/png" href="${favicon['32']}" sizes="32x32">
        <link rel="apple-touch-icon" sizes="57x57" href="${favicon['57']}">
        <link rel="apple-touch-icon" sizes="114x114" href="${favicon['114']}">
        <link rel="apple-touch-icon" sizes="72x72" href="${favicon['72']}">
        <link rel="apple-touch-icon" sizes="144x144" href="${favicon['144']}">
        <link rel="apple-touch-icon" sizes="60x60" href="${favicon['60']}">
        <link rel="apple-touch-icon" sizes="120x120" href="${favicon['120']}">
        <link rel="apple-touch-icon" sizes="76x76" href="${favicon['76']}">
        <link rel="apple-touch-icon" sizes="152x152" href="${favicon['152']}">
    `,
    createTitle: (title) => `<title>${title}</title>`,
    createMeta: (meta) => `
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="${meta.themeColor}">
        <meta name="description" content="${meta.description}">
        <meta name="image" content="${meta.image}">
        <!-- Schema.org for Google -->
        <meta itemprop="name" content="${meta.title}">
        <meta itemprop="description" content="${meta.description}">
        <meta itemprop="image" content="${meta.image}">
        <!-- Twitter -->
        <meta name="twitter:card" content="summary">
        <meta name="twitter:title" content="${meta.title}">
        <meta name="twitter:description" content="${meta.description}">
        <meta name="twitter:site" content="${meta.siteURL}">
        <meta name="twitter:creator" content="@flawlessappio">
        <!-- Open Graph general (Facebook, Pinterest & Google+) -->
        <meta name="og:title" content="${meta.title}">
        <meta name="og:description" content="${meta.description}">
        <meta name="og:image" content="${meta.image}">
        <meta name="og:url" content="${meta.siteURL}">
        <meta name="og:site_name" content="${meta.title}">
        <meta name="fb:admins" content="1685880598347240">
        <meta name="og:type" content="website">
    `,
    fonts: `
        <link href="https://fonts.googleapis.com/css?family=Lato:700|Montserrat:400,600i,700|Pacifico&display=swap" rel="stylesheet">
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

module.exports = Templates;
