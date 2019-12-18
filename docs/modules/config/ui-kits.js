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
} = require('../favicon-adp'); 

const CONFIG = {
	markdownFile: `./Awesome-Design-UI-Kits.md`,
    index: `./docs/index-kits.html`,
    promoFlawlessFeedbackBanner__title: 'Leave feedback on iOS apps',
    promoFlawlessFeedbackBanner__description: 'Turn UI issues & Bugs Into Jira tickets or Trello cards', 
    promoFlawlessFeedbackBanner__link: 'https://flawlessapp.io/feedback',
    main: {
        title: 'Awesome Design UI Kits',
        themeColor: '#F2FAF5',
        bodyColorScheme: '-green',
        logoClassName: '-logo-adp',
        head: {
            title: 'Awesome Design UI Kits',
            meta: {
                title: 'Awesome Design UI Kits',
                themeColor: '#F2FAF5',
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
                    isActive: true,
                    className: '-plugin',
                },
                {
                    title: 'UIKits',
                    href: '/designkits',
                    isActive: false,
                    className: '-tool',
                },
                {
                    title: 'Conferences',
                    href: '/designconferences',
                    isActive: false,
                    className: '-plugin',
                },
            ],
        },
        welcomeArticle: {
            title: 'Awesome Design UI Kits',
            logoClassName: '-logo-adp',
            description: `All the best design plugins for Sketch, Adobe XD, and Figma, gathered in one place.`,
            button: {
                href: 'https://github.com/LisaDziuba/Awesome-Design-Tools/blob/master/Awesome-Design-Plugins.md',
            },
        },

    },
};

module.exports = CONFIG;
