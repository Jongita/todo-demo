// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('addTodo', (task) => {
    cy.get('.new-todo').type(`${task}{enter}`);
});

Cypress.Commands.add('editTask', (task, newTask) => {
    cy.contains('.todo-list li', task).dblclick();
    cy.get('.todo-list li.editing .edit').clear().type(`${newTask}{enter}`);
});

Cypress.Commands.add('verifyTodoCount', () => {
    cy.get('.todo-count').should('exist');
    cy.get('.todo-count strong').should('exist');
    cy.get('.todo-count ng-pluralize').should('exist');
});

// Verify filter links
Cypress.Commands.add('verifyFilterLinks', () => {
    cy.get('.filters').within(() => {
        cy.get('a').contains('All').should('exist');
        cy.get('a').contains('active').should('exist');
        cy.get('a').contains('Completed').should('exist');
    });
});

// Verify the clear completed button
Cypress.Commands.add('verifyClearCompleted', () => {
    cy.get('.clear-completed').should('exist');
});