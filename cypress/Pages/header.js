import BasePage from "./BasePage";
import header from "../selectors/header.css";

class Header extends BasePage {
  open() {
    try {
      return super.open(Cypress.env("URL"));
    } catch (error) {
      console.error("Failed to open settings page", error);
    }
  }

  getToggleButton() {
    return cy.get(header.togglebutton);
  }

  getAllAnchorTags() {
    return cy.get(header.links);
  }

  getHeader() {
    return {
      Logo: cy.get(header.Logo),
      Markets: cy.get(header.links).contains("Market"),
      Settings: cy.get(header.links).contains("Settings"),
      Contact: cy.get(header.links).contains("Contact"),
    };
  }

  getFooter() {
    return {
      CopyRightText: cy.get(header.copyrightText),
      terms: cy.get(header.terms),
    };
  }

  // verify header elements
  verifyHeaderElements() {
    try {
      this.getToggleButton().then(($button) => {
        if ($button.is(":visible")) {
          cy.wrap($button).click();
          cy.scrollTo("top", { duration: 10 });
        } else {
          cy.wrap($button)
            .should("not.be.visible")
            .and("have.css", "display", "none");
        }
      });
      const fields = this.getHeader();
      Object.values(fields).forEach((field) => {
        field.should("be.visible").then(($input) => {
          cy.log(`Header element : ${$input}  is visible`);
        });
      });
    } catch (error) {
      console.error("Error on Header elements are not visible", error);
    }
  }

  //verify footer elements present in the screen
  verifyFooterElements(font_size) {
    try {
      const fields = this.getFooter();
      Object.values(fields).forEach((field) => {
        field.then(($element) => {
          if ($element.is(":visible")) {
            cy.wrap($element).should("have.css", "font-size", font_size);
            cy.log(
              `Footer element : ${$element}  is visible and has font-size - ${font_size}`
            );
            cy.scrollTo("bottom", { duration: 10 });
          } else {
            cy.log(`Footer element : ${$element}  is not visible`);
          }
        });
      });
    } catch (error) {
      console.error("Error on Footer elements are not visible", error);
    }
  }

  //verify all anchor elements present in the screen
  verifyAllAnchorElements() {
    try {
      this.getToggleButton().then(($button) => {
        if ($button.is(":visible")) {
          cy.wrap($button).click();
          cy.scrollTo("top", { duration: 10 });
        } else {
          cy.wrap($button)
            .should("not.be.visible")
            .and("have.css", "display", "none");
          cy.scrollTo("top", { duration: 10 });
        }
      });
      const fields = this.getHeader();
      Object.values(fields).forEach((field) => {
        field
          .should("be.visible")
          .and("have.attr", "href")
          .then(($input) => {
            cy.log(`Anchor link ${$input}  is visible and href`);
          });
      });
    } catch (error) {
      console.error("Error in anchor elements", error);
    }
  }
}

export default new Header();
