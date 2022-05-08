import { recommendation } from "./factories/recommendationFactory";

describe("APP USAGE", () => {
  it("should add the new song recommendation, like and dislike", () => {
    cy.resetDatabase();

    cy.createRecommendation(recommendation);
    cy.contains(recommendation.name);

    cy.reload();
    cy.contains(recommendation.name);

    cy.likeRecommendation();
    cy.dislikeRecommendation();

    cy.end();
  });
});
