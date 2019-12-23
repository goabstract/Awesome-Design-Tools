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
} = require('../favicon/favicon-adk'); 

const CONFIG = {
	markdownFile: `./Awesome-Design-UI-Kits.md`,
    index: `./docs/index-kits.html`,
    promoFlawlessFeedbackBanner__title: 'Leave feedback on iOS apps',
    promoFlawlessFeedbackBanner__description: 'Turn UI issues & Bugs Into Jira tickets or Trello cards', 
    promoFlawlessFeedbackBanner__link: 'https://flawlessapp.io/feedback',
    main: {
        title: 'Awesome Design UI Kits',
        themeColor: '#850289',
        bodyColorScheme: '-violet',
        logoClassName: '-logo-adk',
        head: {
            title: 'Awesome Design UI Kits',
            meta: {
                title: 'Awesome Design UI Kits',
                themeColor: '#850289',
                description: 'Design kits',
                image: 'https://flawlessapp.io/images/designtools/awesome-design-tools-sharable-image-general.png',
                siteURL: 'https://flawlessapp.io/designplugins',
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
                    isActive: false,
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
                    isActive: true,
                    className: '-kit',
                },
            ],
        },
        welcomeArticle: {
            title: 'Awesome Design UI Kits',
            logoClassName: '-logo-adk',
            description: `All the best design plugins for Sketch, Adobe XD, and Figma, gathered in one place.`,
            button: {
                href: 'https://github.com/LisaDziuba/Awesome-Design-Tools/blob/master/Awesome-Design-UI-Kits.md',
            },
        },

    },
};

module.exports = CONFIG;
