class BasePage {
  open(path) {
    return cy.visit(path, { failOnStatusCode: false });
  }
}

export default BasePage;
