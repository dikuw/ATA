import { aliasQuery, aliasMutation } from '../utils/graphql-test-utils'

const users = require('../fixtures/users');
const itemTypes = require('../fixtures/itemTypes');
const itemNamePrefix = 'SRT-7noCO';
const tenant = 'https://test-company.qms-dry-run.nemedio.com';

beforeEach(() => {
  cy.intercept('POST', '/graphql', (req) => {
    // Queries
    aliasQuery(req, 'standardOperatingProceduresQuery');
    aliasQuery(req, 'ItemTypeMetadata');

    // Mutations
    aliasMutation(req, 'createItem')
  })
})

describe('SRT-7 Generic Workflow Normal Path without Change Order', () => {

  it('Opens tenant', () => {
    cy.visit(`${tenant}}/login`);
  })

  it('Logs in as user without the Owner or Approver role', () => {
    cy.get('#username').type(users[0].user);
    cy.get('#password').type('testpass0');
    cy.get('[data-testid="login-button"]').click();
  })

  it('Creates a new item', () => {
    cy.get('#create-item-button').click();
    cy.get('#mui-component-select-itemType').click();
    cy.get(`[data-value="${itemTypes[0].dataValue}"]`).click();
    cy.get('#item-name-input').type(`${itemNamePrefix}${new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false })}`);                                                                             
    cy.get('#item-create-btn').click();
    cy.wait('@gqlcreateItemMutation');
    //  Error without the above line: Uncaught (in promise) Error: GraphQL error: Query.documents: access denied
  })

  it('Opens the item', () => {
    cy.wait('@gqlstandardOperatingProceduresQueryQuery');
    //  Error without the above line: Error: Cannot retrieve "standardOperatingProcedure": GraphQL error: Query.itemType: access denied
    cy.contains('View Item').click();
    // cy.wait('@gqlstandardOperatingProceduresQueryQuery');
    cy.wait('@gqlItemTypeMetadataQuery');
    //  Error with any combination of the above 2 lines: Error: Cannot retrieve "standardOperatingProcedure": GraphQL error: Query.itemType: access denied
  })

  it('Verifies the item is in Draft status', () => {

  })


})