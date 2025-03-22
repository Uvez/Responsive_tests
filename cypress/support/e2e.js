// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import { Runnable } from "mocha";
import "./commands";

import addContext from "mochawesome/addContext";

Cypress.on("test:after:run", (test, runnable) => {
  if (test.state == "failed") {
    const screenshot = `${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (failed).png`;
    addContext({ test }, screenshot);
  }
});

Cypress.on("fail", (err, runnable) => {
  console.log(err.message);
  if (err.name == "AssertionError") {
    throw err;
  } else {
    return false;
  }
});

Cypress.on("uncaught:expection", (err, runnable) => {
  console.log("error", err);
  console.log("runnable", runnable);
  return err;
});
