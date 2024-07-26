const BasePage = require('./base/BasePage');

const fs = require('fs');
const path = require('path');


class Util extends BasePage {

   /* This function will select the radio button or checkbox when it is not selected then only it will work! */
    async setRadioButton(selector) {
        try {
            const element = await $(selector);
            const isElementSelected = await element.isSelected();
            if (!isElementSelected) {
                element.waitForClickable()
                element.click();
            }
        } catch (error) {
            console.error(`Error clicking on element: ${selector}`);
            console.error(error);
            throw error;
        }
    }

    /* Getting the JSON data  */
    static getJsonData(filePath) {
        try {
            const absolutePath = path.resolve(filePath);
            const data = fs.readFileSync(absolutePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error(`Error reading JSON data from file: ${filePath}`);
            console.error(error);
            throw error;
        }
    }
}

module.exports = Util;