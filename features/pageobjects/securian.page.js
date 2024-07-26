/**
 * Author: Sudhanshu Tripathi
 * 
 */
const { $ } = require('@wdio/globals')
const BasePage = require('../base/BasePage');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SecurianCalPage extends BasePage {
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

  /* To fill the the form for reitrement calculator */
  async fillForm(data) {
    try {
      await this.setValue(this.inputCurrentAge, data.currentAge)
      console.log('Entered current age: ' + data.currentAge);

      await this.setValue(this.inputRetirementAge, data.retirementAge)
      console.log('Entered retirement age: ' + data.retirementAge);

      await this.setValue(this.inputCurrentIncome, data.currentIncome)
      console.log('Entered current income: ' + data.currentIncome);

      await this.setValue(this.inputSpouseIncome, data.spouseIncome)
      console.log('Entered spouse income: ' + data.spouseIncome);

      await this.setValue(this.inputCurrentTotalSavings, data.currentRetirementSavings)
      console.log('Entered current total savings: ' + data.currentRetirementSavings);

      await this.setValue(this.inputCurrentAnnualSavings, data.annualRetirementSavings)
      console.log('Entered current annual income: ' + data.annualRetirementSavings);

      await this.setValue(this.inputSavingIncreaseRate, data.savingsIncreaseRate)
      console.log('Entered saving increase rate: ' + data.savingsIncreaseRate);
    } catch (error) {
      console.error(`Error while filling the form ${error.message}`);
      throw error;
    }
  }

  /* To fill the form for adjust the calculation also resued the fillForm */
  async fillFormForAdjustDefaultData(data) {
    try {
      await this.fillForm(data);
      await this.doClickOnElement(this.clickOnAdjustDefaultValue)

      await this.setValue(this.inputAdditonalIncome, data.otherIncome)
      console.log('Entered other income: ' + data.otherIncome);

      await this.setValue(this.inputRetirementDuration, data.retirementDuration)
      console.log('Entered retirement duration: ' + data.retirementDuration);

      await this.setValue(this.inputRetirementAnnualncome, data.retirementAnnualIncome)
      console.log('Entered retirement annual income: ' + data.retirementAnnualIncome);

      await this.setValue(this.inputPreRetirementRoi, data.preRetirementRoi)
      console.log('Entered pre-retirement ROI: ' + data.preRetirementRoi);

      await this.setValue(this.inputPostRetirementRoi, data.postRetirementRoi)
      console.log('Entered post-retirement ROI: ' + data.postRetirementRoi);

      await this.doClickOnElement(this.clickOnSaveChanges)
    } catch (error) {
      console.error(`Error while filling the form for adjust default values ${error.message}`);
      throw error;
    }
  }

  /* To select the SSN radio buttton if it is not selected */
  async selectSocialSecurity(option) {
    if (option) {
      if (await this.selectSocialBenefitsYes.isSelected()) {
        await this.doClickOnElement(this.selectSocialBenefitsYes)
      }
    } else {
      if (!await this.selectSocialBenefitsNo.isSelected()) {
        await this.doClickOnElement(this.selectSocialBenefitsNo)
      }
    }
  }

  async submit() {
    await this.doClickOnElement(this.clickOnCalculateBtn)
  }

  async getResultValidationMessage() {
    return await this.getResultMessage.getText()
  }

}
module.exports = new SecurianCalPage();
