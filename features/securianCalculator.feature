Feature: Financial calculator from Securian application

  Scenario Outline: Calculate retirement savings with valid and invalid data 
    Given User is on the securian retirement calculator page
    When User fill the calculator form with "<data>"
    And User select social security as "<socialSecurity>"
    And User submit the form
    Then User should see the result message "<expectedMessage>"

    Examples:
      | data         | socialSecurity    | expectedMessage                                           |
      | validData    | socialSecurityNo  | Congratulations! You are exceeding your retirement goals. |
      | invalidData  | socialSecurityNo  | Please fill out all required fields                       |
      | adjustedData | socialSecurityYes | Congratulations! You are exceeding your retirement goals. |
      | validData    | socialSecurityYes | Congratulations! You are exceeding your retirement goals. |

  Scenario Outline: Verify some negative cases to calculate retirement savings
    Given User is on the securian retirement calculator page
    When User fill the calculator form with "<negativData>"
    And User submit the form
    Then User should see the result message "<expectedMessage>"

    Examples:
      | negativData                     | expectedMessage                                         |
      | allZero                         | Age cannot be 0                                         |
      | currentAgeGreaterThanRetirement | Planned retirement age must be greater than current age |
      | currentAgeGreaterThan120        | Age cannot be greater than 120                          |
