class BasePage {
    /**
        * Clicks on a web element
        * @param {string} selector - The selector of the web element to click
        */
    async doClickOnElement(selector) {
        try {
            const element = await $(selector);
            await element.waitForClickable();
            await element.click();
            console.log(`Clicked on element: ${selector}`);
        } catch (error) {
            console.error(`Error clicking on element: ${selector}`);
            console.error(error);
            throw error;
        }
    }

    /**
     * Sets value to a web element 
     * @param {string} selector - The selector of the web element to set value
     * @param {string} value - The value to set
     */
    async setValue(selector, value) {
        try {
            const element = await $(selector);
            await element.waitForEnabled();
            await element.click();
            await element.setValue(value);
            console.log(`Set value for element: ${selector}`);
        } catch (error) {
            console.error(`Error setting value for element: ${selector}`);
            console.error(error);
            throw error;
        }
    }

}
module.exports = BasePage;