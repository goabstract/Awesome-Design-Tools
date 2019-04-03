const tinycolor = require('tinycolor2');

const addBackgroundColorToLogo = ({ document }) => {
	const backgroundColorsHSL = [
		'240,78.8%,87.1%',    '270,78.8%,87.1%',     '340.5,76.9%,89.8%',   '0,78.8%,87.1%',       '30,79.6%,80.8%',
		'150,79.6%,80.8%',    '176.3,38%,74.7%',     '253.3,94.7%,92.5%',   '15.7,86.7%,85.3%',    '198.8,88.9%,89.4%',
		'71.7,97.6%,83.5%',   '271,93.9%,93.5%',     '4.4,36%,85.3%',       '14.6,95.3%,83.1%',    '35.3,95.7%,81.6%',
		'140.4,36.2%,72.9%',  '193.8,38.7%,75.7%',   '251,71.4%,83.5%',     '30.3,79.9%,70.8%',    '30,79.6%,80.8%',
		'60,79.6%,80.8%',     '180,79.6%,80.8%',     '210,79.6%,80.8%',     '210,79.6%,80.8%',     '0,79.6%,80.8%',
		'0,78.7%,90.8%',      '271.6,77.1%,81.2%',   '271.6,77.1%,81.2%',   '61.6,77.1%,81.2%',    '121.6,77.1%,81.2%',
		'181.6,77.1%,81.2%',  '181.6,77.1%,81.2%',   '241.6,77.1%,81.2%',   '0,0%,78%',            '0,41.1%,78%',
		'121.6,77.1%,81.2%',  '121.6,77.1%,81.2%',   '121.6,77.1%,81.2%',
	];

	const createHsvFontColor = (hsv) => {
		const color = tinycolor(`hsl(${hsv})`);
		const splitted = color.toHsvString().split(',');
		const saturation = parseFloat(splitted[1]);
		const lightness = parseFloat(splitted[2]);
		return `${[splitted[0],`${saturation+15}%`,`${lightness-13}%`].join(',')})`;
	}
	const categories = document.querySelectorAll('article');
	categories.forEach((category, colorNumber = 0) => {
		const logos = category.querySelectorAll('.tool__asset');
		logos.forEach((logo) => {
			const color = tinycolor(createHsvFontColor(backgroundColorsHSL[colorNumber]));
			logo.style.backgroundColor = `hsl(${backgroundColorsHSL[colorNumber]})`;
			logo.style.color = color.toRgbString();
		});
		colorNumber += 1;
	})
}

module.exports = addBackgroundColorToLogo;
