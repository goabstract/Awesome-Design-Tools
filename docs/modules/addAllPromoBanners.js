const promotionBanner = require('./view/promotionBanner');

const addAllPromoBanners = (window) => {
    // promotionBanner(
    //     window,
    //     {
    //         className: '-supernova',
    //         logo: '-supernova',
    //         title: 'Supernova',
    //         description: 'Convert any mobile design into full-fledged native applications',
    //         link: {
    //             href: 'http://bit.ly/2ZwUoEq',
    //             className: '-supernova',
    //             text: 'Try Supernova Studio',
    //         },
    //     },
    //     [
    //         '#code-export', '#collaboration', '#developers-handoff',
    //         '#design-to-code-tools', '#collaboration-tools'
    //     ]
    // );
    promotionBanner(
        window,
        {
            className: '-abstract',
            logo: '-abstract',
            title: 'Abstract',
            description: 'We centralize design decisions, feedback, Sketch files, and specs for your team.',
            link: {
                href: 'https://www.abstract.com/campaigns/collaboration/?&utm_medium=Partner-Advertising&utm_source=PA-Native-Digital&utm_campaign=CY19-PA-FlawlessApp-1018-Sept12&utm_term=designplugins&utm_content=Sponsored',
                className: '-abstract',
                text: 'Get a free, 14-day trial',
            },
        },
        [
            '#version-control', '#plugin-development', '#animation-tools', '#gradient-tools',
            '#ui-design-tools', '#design-version-control', '#design-system-tools',
            '#accessibility', '#copy--paste', '#map-generation',
            '#visual-debugging-tools'
        ]
    );
    // promotionBanner(
    //     window,
    //     {
    //         className: '-protopie',
    //         logo: '-protopie',
    //         title: 'ProtoPie',
    //         description: 'Interactive prototyping for all digital products',
    //         link: {
    //             href: 'http://bit.ly/33KtOpN',
    //             className: '-protopie',
    //             text: 'Try for Free',
    //         },
    //     },
    //     [
    //         '#prototyping', '#plugins-collection',
    //         '#prototyping-tools', '#mockup-tools', '#user-flow-tools'
    //     ]
    // );
    // promotionBanner(
    //     window,
    //     {
    //         className: '-maze',
    //         logo: '-maze',
    //         title: 'Maze',
    //         description: 'Maze is a user testing platform that turns your prototype into actionable insights.',
    //         link: {
    //             href: 'http://bit.ly/35I1q9q',
    //             className: '-maze',
    //             text: 'Try for Free',
    //         },
    //     },
    //     [
    //         '#analytics-and-user-research', '#user-flows',
    //         '#experience-monitoring', '#user-research-tools'
    //     ]
    // );
    // promotionBanner(
    //     window,
    //     {
    //         className: '-porkbun',
    //         logo: '-porkbun',
    //         title: 'Get your free .design domain name!',
    //         description: `Thinking of building your portfolio? .design is like .com, and .net, but it's more relevant to what you do as a designer.`,
    //         hasImage: true,
    //         // image1x: 'https://flawlessapp.io/images/designtools/porkbun/porkbun-logo.png',
    //         // image2x: 'https://flawlessapp.io/images/designtools/porkbun/porkbun-logo@2x.png',
    //         // image3x: 'https://flawlessapp.io/images/designtools/porkbun/porkbun-logo@3x.png',
    //         link: {
    //             href: 'http://bit.ly/2VQVTJ8',
    //             className: '-porkbun',
    //             text: 'Get 1-year Free',
    //         },
    //     },
    //     [
    //         '#website-and-html-export', '#code-highlight', '#presentation-and-preview',
    //         '#screenshot-software', '#design-inspiration', '#illustrations'
    //     ]
    // );
    // promotionBanner(
    //     window,
    //     {
    //         className: '-xd',
    //         logo: '-xd',
    //         title: 'Adobe XD',
    //         description: 'Design at the speed of thought.',
    //         link: {
    //             href: 'https://adobe.ly/33HVSdf',
    //             className: '-xd',
    //             text: 'Use For Free',
    //         },
    //     },
    //     [
    //         '#generate-ui-element',
    //         '#tools-for-learning-design', '#design-handoff-tools'
    //     ]
    // );
}

module.exports = addAllPromoBanners;