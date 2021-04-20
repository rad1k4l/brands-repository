const {Browser} = require('../browser/browser')
const {LogoScrape} = require('logo-scrape');

class Spider {
    browser;

    constructor(browser) {
        this.browser = browser ? browser : new Browser();
    }

    async fetch(url) {
        let page = await this.browser.getPage();
        await page.goto(url);
        return (await page.content());
    }


    async grabSvgLogo(html) {

    }

    async fastScan(url) {
        let rawLogos = await LogoScrape.getLogos(url);
        console.log(rawLogos)
        return rawLogos;
    }
}

module.exports = {
    Spider,
};
