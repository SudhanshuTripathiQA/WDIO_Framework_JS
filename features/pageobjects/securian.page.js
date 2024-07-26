const { $ } = require('@wdio/globals')
const Page = require('./page');
const BasePage = require('./BasePage');

// const BasePage = require('/base/BasePage');

const pages = {
  baseClass: BasePage
}

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SecurianCalPage extends Page {
  /**
   * define selectors using getter methods
   */

  get inputCurrentAge() {
    return $('#current-age');
  }

  get inputRetirementAge() {
    return $('#retirement-age');
  }

  get inputCurrentIncome() {
    return $('#current-income');
  }

  get inputSpouseIncome() {
    return $('#spouse-income');
  }

  get inputCurrentTotalSavings() {
    return $('#current-total-savings');
  }

  get inputCurrentAnnualSavings() {
    return $('#current-annual-savings');
  }

  get inputSavingIncreaseRate() {
    return $('#savings-increase-rate');
  }

  get selectSocialBenefitsYes() {
    return $('#yes-social-benefits');
  }

  get selectSocialBenefitsNo() {
    return $('#no-social-benefits');
  }

  // Web Elements for Adjust default values
  get clickOnAdjustDefaultValue() {
    return $("//a[text()='Adjust default values']");
  }

  get inputAdditonalIncome() {
    return $('#additional-income');
  }

  get inputRetirementDuration() {
    return $('#retirement-duration');
  }
  get selectInflation() {
    return $('#include-inflation');
  }

  get inputExpectedInflation() {
    return $('#expected-inflation-rate');
  }

  get inputRetirementAnnualncome() {
    return $('#retirement-annual-income');
  }

  // Web Elements for Investment expectations under Adjust default values
  get inputPreRetirementRoi() {
    return $('#pre-retirement-roi');
  }

  get inputPostRetirementRoi() {
    return $('#post-retirement-roi');
  }

  get clickOnCalculateBtn() {
    return $("//button[text()='Calculate']");
  }

  get getResultMessage() {
    return $("#result-message");
  }
  get getReitrementAgeErrorMessage() {
    return $("#invalid-retirement-age-error");
  }
  get getCurrentAgeErrorMessage() {
    return $("#invalid-current-age-error");
  }
  get selectMartialStatus() {
    return $('#married');
  }

  get inputSocialSecurityAmount() {
    return $('#social-security-override');
  }

  get getCalculatorAlertMessage() {
    return $('#calculator-input-alert-desc');
  }
  get clickOnSaveChanges() {
    return $("//button[text()='Save changes']");
  }

  /**
  * overwrite specific options to adapt it to page object
  */
  async open() {
    try {
      console.log('Navigating to the Securian retirement calculator page');
      return super.open('retirement-calculator.html');
    } catch (error) {
      BasePage
      console.error(`Error navigating to the page: ${error.message}`);
      throw error;
    }
  }

  async fillForm(data) {
    try {
      console.log('data is from fillFOrm: ' + data)
      // BasePage.printHello();
      await this.inputCurrentAge.setValue(data.currentAge)
      console.log('Entered current age: ' + data.currentAge);
      await this.inputRetirementAge.setValue(data.retirementAge)
      console.log('Entered retirement age: ' + data.retirementAge);
      await this.inputCurrentIncome.click();
      await this.inputCurrentIncome.setValue(data.currentIncome)
      // await BasePage.setValue(inputCurrentIncome, data.currentIncome);
      console.log('Entered current income: ' + data.currentIncome);
      await this.inputSpouseIncome.click();
      await this.inputSpouseIncome.setValue(data.spouseIncome)
      console.log('Entered spouse income: ' + data.spouseIncome);
      await this.inputCurrentTotalSavings.click();
      await this.inputCurrentTotalSavings.setValue(data.currentRetirementSavings)
      console.log('Entered current total savings: ' + data.currentRetirementSavings);
      await this.inputCurrentAnnualSavings.click();
      await this.inputCurrentAnnualSavings.setValue(data.annualRetirementSavings)
      console.log('Entered current annual income: ' + data.annualRetirementSavings);
      await this.inputSavingIncreaseRate.click();
      await this.inputSavingIncreaseRate.setValue(data.savingsIncreaseRate)
      console.log('Entered saving increase rate: ' + data.savingsIncreaseRate);
    } catch (error) {
      console.error(`Error while filling the form ${error.message}`);
      throw error;
    }
  }

  async fillFormForAdjustDefaultData(data) {
    try {
      await this.fillForm(data);
      await this.clickOnAdjustDefaultValue.click()
      await this.inputAdditonalIncome.click()
      await this.inputAdditonalIncome.setValue(data.otherIncome)
      console.log('Entered other income: ' + data.otherIncome);
      await this.inputRetirementDuration.click()
      await this.inputRetirementDuration.setValue(data.retirementDuration)
      console.log('Entered retirement duration: ' + data.retirementDuration);
      await this.inputRetirementAnnualncome.click()
      await this.inputRetirementAnnualncome.setValue(data.retirementAnnualIncome)
      console.log('Entered retirement annual income: ' + data.retirementAnnualIncome);
      await this.inputPreRetirementRoi.click()
      await this.inputPreRetirementRoi.setValue(data.preRetirementRoi)
      console.log('Entered pre-retirement ROI: ' + data.preRetirementRoi);
      await this.inputPostRetirementRoi.click()
      await this.inputPostRetirementRoi.setValue(data.postRetirementRoi)
      console.log('Entered post-retirement ROI: ' + data.postRetirementRoi);
      await this.clickOnSaveChanges.click();
    } catch (error) {
      console.error(`Error while filling the form for adjust default values ${error.message}`);
      throw error;
    }
  }

  async selectSocialSecurity(option) {
    if (option) {
      if (await this.selectSocialBenefitsYes.isSelected()) {
        await this.selectSocialBenefitsYes.waitForClickable()
        await this.selectSocialBenefitsYes.click()
      }
    } else {
      if (!await this.selectSocialBenefitsNo.isSelected()) {
        await this.selectSocialBenefitsNo.waitForClickable()
        await this.selectSocialBenefitsNo.click()
      }
    }
  }

  async submit() {
    await this.clickOnCalculateBtn.waitForClickable()
    await this.clickOnCalculateBtn.click()
  }

  async getResultValidationMessage() {
    return await this.getResultMessage.getText()
  }

}
module.exports = new SecurianCalPage();
