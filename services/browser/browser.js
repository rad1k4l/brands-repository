const {chromium} = require('playwright');

class Browser {
    async startBrowser() {
        // arrow function
        return new Promise(async (resolve) => {
            const args = [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-infobars',
                '--window-position=0,0',
                '--ignore-certificate-errors',
                '--ignore-certificate-errors-spki-list',
            ];
            const options = {
                args,
                headless: false,
            };
            this.instance = await chromium.launch(options);
            console.log("launched")
            resolve(this.instance);
        });
    }

    async getPage() {
        let browser = await this.getInstance();
        let page = await browser.newPage();
        await page.addInitScript({path: './preload.js'});
        return page;
    }

    async getInstance() {
        if (!this.instance) {
            console.log('not instance')
            await this.startBrowser();
        }
        return this.instance;
    }
}

module.exports = {Browser};
