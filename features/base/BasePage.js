/**
 * Author: Sudhanshu Tripathi
 * 
 */
const { browser } = require('@wdio/globals')
const { $ } = require('@wdio/globals')

module.exports = class BasePage {

    /**
       * Opens a sub page of the page
       * @param path path of the sub page (e.g. /path/to/page.html)
       */
    open(path) {
        return browser.url(`https://www.securian.com/insights-tools/${path}`)
    }

    /**
        * Clicks on a web element
        * @param {string} selector - The selector of the web element to click
        */
    async doClickOnElement(element) {
        try {
            await element.waitForClickable();
            await element.click();
            //console.log('Clicked on element: ' +element);
        } catch (error) {
            console.error('Error clicking on element:' + element);
            console.error(error);
            throw error;
        }
    }

    /**
     * Sets value to a web element 
     * @param {string} selector - The selector of the web element to set value
     * @param {string} value - The value to set
     */
    async setValue(element, value) {
        try {
            // const element.waitForEnabled();
            await element.click();
            await element.setValue(value);
            console.log('Set value is: ' + value);
        } catch (error) {
            console.error('Error setting value for element: ' + element);
            console.error(error);
            throw error;
        }
    }

}