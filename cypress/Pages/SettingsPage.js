import BasePage from "./BasePage";
import settings from "../selectors/settings.css";

class SettingsPage extends BasePage {
  open() {
    try {
      return super.open(Cypress.env("URL"));
    } catch (error) {
      console.error("Failed to open settings page", error);
    }
  }
  getSectionHeading() {
    return cy.get(settings.Heading);
  }

  getAllRequiredFields() {
    return {
      firstname: cy.get(settings.firstname),
      Lastname: cy.get(settings.Lastname),
      dob: cy.get(settings.dob),
      city: cy.get(settings.city),
      state: cy.get(settings.state),
      telephone: cy.get(settings.telephone),
      Email: cy.get(settings.Email),
    };
  }

  getAllFields() {
    return {
      salutation: cy.get(settings.salutation),
      firstname: cy.get(settings.firstname),
      Lastname: cy.get(settings.Lastname),
      dob: cy.get(settings.dob),
      address: cy.get(settings.address),
      city: cy.get(settings.city),
      state: cy.get(settings.state),
      zip: cy.get(settings.zip),
      telephone: cy.get(settings.telephone),
      Email: cy.get(settings.Email),
      website: cy.get(settings.website),
    };
  }
  getUpdateProfileBtn() {
    return cy.get(settings.UpdateProfileButton);
  }
  getSuccessMessage() {
    return cy.get(settings.Success_Message);
  }
  getProfileTab() {
    return cy.get(settings.tabs);
  }

  getLabels() {
    return cy.get(settings.labels);
  }
  fillField(field, value) {
    if (value != "") {
      field.clear().type(value);
    } else {
      field.should("have.value", value);
    }
  }

  enterdetails(
    salutation = null,
    firstname,
    lastname,
    DOB,
    address = null,
    City,
    state,
    zip = null,
    telephone,
    Email,
    website = null
  ) {
    const fields = this.getAllFields();
    try {
      if (salutation) {
        fields.salutation.select(salutation);
      }
      this.fillField(fields.firstname, firstname);
      this.fillField(fields.Lastname, lastname);
      this.fillField(fields.dob, DOB);
      this.fillField(fields.city, City);
      this.fillField(fields.state, state);
      this.fillField(fields.telephone, telephone);
      this.fillField(fields.Email, Email);

      if (address) {
        this.fillField(fields.address, address);
      }

      if (zip) {
        this.fillField(fields.zip, zip);
      }

      if (website) {
        this.fillField(fields.website, website);
      }
    } catch (error) {
      console.error("Error entering user details", error);
    }
  }

  clickUpdateProfile() {
    try {
      this.getUpdateProfileBtn().click();
    } catch (error) {
      console.error("Error clicking on update profile button", error);
    }
  }

  //verify Button
  verifyButton(padding) {
    try {
      this.getUpdateProfileBtn()
        .should("be.visible")
        .should("have.css", "padding", padding);
      cy.scrollTo("bottom", { duration: 10 });
    } catch (error) {
      console.error("Error clicking on update profile button", error);
    }
  }

  //verify header of the screen
  verifyHeader(header_font_size) {
    try {
      this.getSectionHeading()
        .should("be.visible")
        .should("have.css", "font-size", header_font_size);
    } catch (error) {
      console.error("Header verification failed", error);
    }
  }

  //verify message after clicking submit button
  verifySuccessMessage(text_message, text_color) {
    try {
      this.getSuccessMessage()
        .should("be.visible")
        .should("contain.text", text_message)
        .should("have.css", "color", text_color);
    } catch (error) {
      console.error("Success message verification failed:", error);
    }
  }

  //verify Tab visibility
  verifyTabVisibility() {
    this.getProfileTab().each(($element) => {
      cy.wrap($element).should("be.visible");
    });
  }

  //verify font size
  verifyFontSize() {
    this.getLabels().each(($element) => {
      cy.wrap($element)
        .should("be.visible")
        .invoke("css", "font-size")
        .then((size) => {
          const parsedSize = parseFloat(size);
          expect(parsedSize).to.be.greaterThan(12);
        });
    });
  }

  //Verify All input elements visible in the screen
  verifyElementsVisible(display, padding) {
    try {
      const fields = this.getAllFields();
      Object.values(fields).forEach((field) => {
        field
          .should("be.visible")
          .and("have.css", "display", display)
          .and("have.css", "padding", padding)
          .then(($input) => {
            cy.wrap($input).scrollIntoView();
            cy.wrap($input).invoke("height").should("be.greaterThan", 15);
            cy.wrap($input)
              .invoke("css", "overflow-y")
              .then((value) => {
                expect(["auto", "clip"]).to.include(value);
              });
            cy.log("Element is visible and has expected styles");
          });
      });
    } catch (error) {
      console.error("Error elements are not visible", error);
    }
  }

  //verify Form Layout in different screens
  verifyFormLayout(width, display) {
    try {
      const fields = this.getAllFields();
      const expectedWidth = width <= 750 ? 200 : 630;
      Object.values(fields).forEach((field) => {
        field.should("be.visible").then(($input) => {
          cy.wrap($input).should("have.css", "display", display);
          cy.wrap($input)
            .invoke("width")
            .should("be.greaterThan", expectedWidth);
          cy.log(`All fields in form has display block for ${width} screen`);
        });
      });
    } catch (error) {
      console.error("Error on form layout", error);
    }
  }
  // check if user input invalid email
  verifyInvalidEmail() {
    try {
      var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const fields = this.getAllRequiredFields();
      Object.values(fields).forEach((field) => {
        field.then(($element) => {
          const isEmailType = $element.prop("type");

          if (isEmailType == "email") {
            const validationMessage = $element.prop("validationMessage");

            const expectedMessage = [
              "Please enter a part followed by '@'.",
              "'.' is used in wrong position in '.com'",
              "A part of following '@' should not contain the symbol '@'",
              "Please include an '@' in the email address",
              "Please enter an email address",
            ];

            cy.wrap($element)
              .invoke("val")
              .then((input) => {
                const emailstate = re.test(input);
                if (!emailstate) {
                  const messageMatches = expectedMessage.some((expected) =>
                    validationMessage.includes(expected)
                  );
                  cy.log(
                    "Validation message is been displayed here - " +
                      validationMessage
                  );
                  expect(messageMatches).to.be.true;
                } else {
                  cy.log("valid Email is been entered");
                }
              });
          }
        });
      });
    } catch (error) {
      console.error("Error on validation messages", error);
    }
  }

  //Validates the messages
  verifyValidationMessage(text_message) {
    try {
      const fields = this.getAllRequiredFields();
      Object.values(fields).forEach((field) => {
        field.then(($element) => {
          cy.wrap($element)
            .invoke("prop", "validationMessage")
            .should("equal", text_message);
          cy.log("validation Message displayed");
        });
      });
    } catch (error) {
      console.error("Error on validation messages", error);
    }
  }
}

export default new SettingsPage();
