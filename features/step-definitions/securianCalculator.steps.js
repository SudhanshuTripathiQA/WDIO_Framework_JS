const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect, $ } = require('@wdio/globals')

const SecurianCalPage = require('../pageobjects/securian.page');

const fs = require('fs')
let testData = JSON.parse(fs.readFileSync('testDataManagent/retirementCalc.json'))

// Data utility
// const Utilities = require('./util/Utilities');
// const Util = require('../pageobjects/Util');
// const util = new Util();
// const data = Utilities.getJsonData('./testDataManagent/retirementCalc.json');
// =====

let messageElement = 'dataType';

const pages = {
    sec: SecurianCalPage
}

Given(/^User is on the securian retirement calculator page$/, async () => {
    await SecurianCalPage.open();
});

When(/^User fill the calculator form with "(.*)"$/, async (dataKey) => {
    try {
        messageElement = dataKey;
        const data = testData[dataKey]
        if (messageElement === 'validData' || messageElement === 'invalidData' || messageElement === 'allZero' || messageElement === 'currentAgeGreaterThanRetirement' || messageElement === 'currentAgeGreaterThan120') {
            await SecurianCalPage.fillForm(data)
        }
        else if (messageElement === 'adjustedData') {
            await SecurianCalPage.fillFormForAdjustDefaultData(data)
        }
    } catch (error) {
        console.error(`Error while filling the form: ${error.message}`);
        throw error;
    }
})

When(/^User select social security as "(.*)"$/, async (socialSecurityKey) => {
    try {
        const option = testData[socialSecurityKey]
        await SecurianCalPage.selectSocialSecurity(option)
    } catch (error) {
        console.error(`Error while selecting the social security option: ${error.message}`);
        throw error;
    }
})

When(/^User submit the form$/, async () => {
    try {
        console.log('Now submitting the form finally!')
        await SecurianCalPage.submit()
    } catch (error) {
        console.error(`Error while submiting the form ${error.message}`);
        throw error;
    }
})

Then(/^User should see the result message "(.*)"$/, async (expectedMessage) => {
    try {
        await browser.pause(5000);
        if (messageElement === 'validData' || messageElement === 'adjustedData') {
            await expect(SecurianCalPage.getResultMessage).toHaveText(
                expect.stringContaining(expectedMessage))
        }
        else if (messageElement === 'allZero' || messageElement === 'currentAgeGreaterThanRetirement') {
            await expect(SecurianCalPage.getReitrementAgeErrorMessage).toHaveText(
                expect.stringContaining(expectedMessage))
        } else if (messageElement === 'currentAgeGreaterThan120') {
            await expect(SecurianCalPage.getCurrentAgeErrorMessage).toHaveText(
                expect.stringContaining(expectedMessage))
        }
        else {
            await expect(SecurianCalPage.getCalculatorAlertMessage).toHaveText(
                expect.stringContaining(expectedMessage))
        }
    } catch (error) {
        console.error(`Error during message verification: ${error.message}`);
        throw error;
    }
})
