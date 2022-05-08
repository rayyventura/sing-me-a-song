Cypress.Commands.add("resetDatabase", () => {
  cy.request("POST", "http://localhost:5000/recommendations/reset", {});
});
Cypress.Commands.add("alertMessage", () => {
  cy.on("window:alert", (text) => {
    expect(text).to.contains("Error creating recommendation!");
  });
});
Cypress.Commands.add("createRecommendation", (recommendation) => {
  cy.visit("http://localhost:3000/");

  cy.get("input").first().type(recommendation.name);
  cy.get("input").last().type(recommendation.link);

  cy.intercept("POST", "http://localhost:5000/recommendations").as(
    "postRecomendation"
  );

  cy.get("button").click();

  cy.wait("@postRecomendation");
});
Cypress.Commands.add("likeRecommendation", () => {
  cy.get("article").within(() => {
    cy.get("div").last().should("have.text", "0");
  });

  cy.get("article").first().find("svg").first().click();

  cy.get("article").within(() => {
    cy.get("div").last().should("have.text", "1");
  });
  cy.reload();

  cy.get("article").within(() => {
    cy.get("div").last().should("have.text", "1");
  });
});
Cypress.Commands.add("dislikeRecommendation", () => {
  cy.get("article").within(() => {
    cy.get("div").last().should("have.text", "1");
  });

  cy.get("article").first().find("svg").last().click();

  cy.get("article").within(() => {
    cy.get("div").last().should("have.text", "0");
  });
  cy.reload();

  cy.get("article").within(() => {
    cy.get("div").last().should("have.text", "0");
  });
});
