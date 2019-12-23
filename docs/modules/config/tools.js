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
} = require('../favicon/favicon-adt'); 

const CONFIG = {
	markdownFile: `./README.md`,
	index: `./docs/index.html`,
    promoFlawlessFeedbackBanner__title: 'Leave feedback on iOS apps',
    promoFlawlessFeedbackBanner__description: 'Turn UI issues & Bugs Into Jira tickets or Trello cards', 
    promoFlawlessFeedbackBanner__link: 'https://flawlessapp.io/feedback',
    main: {
        title: 'Awesome Design Tools',
        themeColor: '#0054d7',
        bodyColorScheme: '-blue',
        logoClassName: '-logo-adt',
        head: {
            title: 'Awesome Design Tools',
            meta: {
                title: 'Awesome Design Tools',
                themeColor: '#0054d7',
                description: 'The best design tools for everything — from wireframing and prototyping to animation, accessibility, AR, design systems and sound design.',
                image: 'https://flawlessapp.io/images/designtools/awesome-design-tools-sharable-image-general.png',
                siteURL: 'https://flawlessapp.io/designtools',
            },
            favicon: {
                '196': favicon196,
                '160': favicon160,
                '152': favicon152,
                '144': favicon144,
                '120': favicon120,
                '114': favicon114,
                '96': favicon96,
                '76': favicon76,
                '72': favicon72,
                '60': favicon60,
                '57': favicon57,
                '32': favicon32,
                '16': favicon16,
            },
        },
        nav: {
            loop: [
                {
                    title: 'Tools',
                    href: '/designtools',
                    isActive: true,
                    className: '-tool',
                },
                {
                    title: 'Plugins',
                    href: '/designplugins',
                    isActive: false,
                    className: '-plugin',
                },
                {
                    title: 'UI Kits',
                    href: '/designkits',
                    isActive: false,
                    className: '-kit',
                },
            ],
        },
        welcomeArticle: {
            title: 'Awesome Design Tools',
            logoClassName: '-logo-adt',
            description: `The best design tools for everything. Curated by Lisa Dziuba & Valia Havruliyk from <a href="https://flawlessapp.io/feedback">Flawless team</a>.`,
            button: {
                href: 'https://github.com/LisaDziuba/Awesome-Design-Tools',
            },
        },
    },
}

module.exports = CONFIG;
