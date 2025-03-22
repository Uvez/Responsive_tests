import BasePage from "../Pages/BasePage";
import header from "../Pages/header";
import SettingsPage from "../Pages/SettingsPage";
import TestData from "../fixtures/settings.json";
import property from "../fixtures/properties.json";
const dimension = require("../utilities/Dimensions");

describe("Verify Responsive testing for the Profile Setting Form in various screen sizes", () => {
  beforeEach(() => {
    SettingsPage.open();
  });

  Object.values(dimension).forEach((viewport) => {
    it(`Verify visibility of elements on ${viewport.name} screen`, () => {
      cy.viewport(viewport.viewportWidth, viewport.viewportHeight);
      header.verifyHeaderElements();
      SettingsPage.verifyHeader(property.header_font_size);
      SettingsPage.verifyTabVisibility();
      SettingsPage.verifyElementsVisible(property.display, property.padding);
    });

    it(`Verify the "Update Profile" button at the bottom on ${viewport.name} screen`, () => {
      cy.viewport(viewport.viewportWidth, viewport.viewportHeight);
      SettingsPage.verifyButton(property.padding);
    });

    it(`Verify font size is readable on ${viewport.name} screen`, () => {
      cy.viewport(viewport.viewportWidth, viewport.viewportHeight);
      SettingsPage.verifyFontSize();
    });

    it(`Verify form layout on  ${viewport.name} screen`, () => {
      cy.viewport(viewport.viewportWidth, viewport.viewportHeight);
      SettingsPage.verifyFormLayout(viewport.viewportWidth, property.display);
    });
    it(`Verify scrolling to see all fields on ${viewport.name} screen`, () => {
      cy.viewport(viewport.viewportWidth, viewport.viewportHeight);
      //cy.scrollTo(0, 1000);
      SettingsPage.verifyElementsVisible(property.display, property.padding);
    });

    it(`Verify buttons are clickable on ${viewport.name} screen`, () => {
      cy.viewport(viewport.viewportWidth, viewport.viewportHeight);
      SettingsPage.getUpdateProfileBtn()
        .should("be.enabled")
        .click()
        .then(() => {
          SettingsPage.verifyValidationMessage(TestData.required_field_message);
        });
    });

    it(`Verify Footer visiblity and layout on  ${viewport.name} screen`, () => {
      cy.viewport(viewport.viewportWidth, viewport.viewportHeight);
      header.verifyFooterElements(property.footer_font_size);
    });

    it(`Verify that all links are working on   ${viewport.name} screen`, () => {
      cy.viewport(viewport.viewportWidth, viewport.viewportHeight);
      header.verifyAllAnchorElements();
    });

    //verify element test case
    it(`Verify element layout on Landscape mode of   ${viewport.name} screen`, () => {
      cy.viewport(viewport.viewportHeight, viewport.viewportWidth);
      header.verifyHeaderElements();
      header.verifyAllAnchorElements();
      header.verifyFooterElements(property.footer_font_size);
      SettingsPage.verifyElementsVisible(property.display, property.padding);
    });

    it(`Verify form validation for all fields on ${viewport.name} screen`, () => {
      cy.viewport(viewport.viewportWidth, viewport.viewportHeight);
      SettingsPage.enterdetails(
        TestData.Salutation,
        TestData.FirstName,
        TestData.LastName,
        TestData.DOB,
        TestData.address,
        TestData.City,
        TestData.State,
        TestData.Zip,
        TestData.Telephone,
        TestData.Email,
        TestData.Website
      );
      SettingsPage.clickUpdateProfile();
      SettingsPage.verifySuccessMessage(
        TestData.SuccessMessage,
        property.text_color
      );
    });

    it("Verify form validation message for required fields", () => {
      cy.viewport(viewport.viewportWidth, viewport.viewportHeight);
      SettingsPage.enterdetails(
        null,
        TestData.emptyfield,
        TestData.emptyfield,
        TestData.emptyfield,
        null,
        TestData.emptyfield,
        TestData.emptyfield,
        null,
        TestData.emptyfield,
        TestData.emptyfield,
        null
      );
      SettingsPage.clickUpdateProfile();
      SettingsPage.verifyValidationMessage(settingsData.required_field_message);
    });

    it(`Verify form validation for invalid email on ${viewport.name} screen`, () => {
      cy.viewport(viewport.viewportWidth, viewport.viewportHeight);
      SettingsPage.enterdetails(
        TestData.Salutation,
        TestData.FirstName,
        TestData.LastName,
        TestData.DOB,
        TestData.address,
        TestData.City,
        TestData.State,
        TestData.Zip,
        TestData.Telephone,
        TestData.invalid_email,
        TestData.Website
      );
      SettingsPage.clickUpdateProfile();
      SettingsPage.verifyInvalidEmail();
    });
  });
});
