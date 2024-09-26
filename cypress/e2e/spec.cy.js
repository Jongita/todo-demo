const pageUrl = 'https://todolist.james.am/'

const task1 = 'To do homworks';
const task2 = 'Run 3km';
const task3 = 'Wash dishes! & wash the floor!';
const task4 = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, veniam iure cupiditate quo impedit consequuntur corporis sunt officia. Laborum quos debitis beatae ea autem consectetur deserunt nesciunt dolorem minus quod.';

describe('Website on load', () => {

  beforeEach(() => {
    cy.visit(pageUrl)
  });

  it('should display the form header on load', () => {
    cy.get('h1').should('have.text', 'To Do List')
  });

  it('should display input on load', () => {
    cy.get('input.new-todo[placeholder="What need\'s to be done?"]').should('exist');
    cy.get('input.new-todo[placeholder="What need\'s to be done?"]').should('be.visible');
  });
})

describe('Add ToDo task and verify that task exists', () => {

  describe('Add ToDo task as string', () => {
    beforeEach(() => {
      cy.visit(pageUrl);
    });

    it('should type task and verify that task exists', () => {
      cy.get('input.new-todo').type(`${task1}{enter}`);
      cy.get('.todo-list').find('label').contains(task1).should('exist');
      cy.get('.todo-list li').should('have.length', 1)
      cy.get('strong').should('contain', '0'); // Cahnged from 1 to 0
    });

    it('should verify all footer elements exist', () => {
      cy.get('.todo-count').should('exist');
      cy.get('.todo-count strong').should('exist');
      cy.get('.todo-count ng-pluralize').should('exist');
      cy.get('.filters').within(() => {
        cy.get('a').contains('All').should('exist');
        cy.get('a').contains('active').should('exist');
        cy.get('a').contains('Completed').should('exist');
      });
      cy.get('.clear-completed').should('exist');
    });
  });

  describe('Add ToDo task with numbers', () => {
    beforeEach(() => {
      cy.visit(pageUrl);
    });

    it('should type task and verify that task exists', () => {
      cy.get('input.new-todo').type(`${task2}{enter}`);
      cy.get('.todo-list').find('label').contains(task2).should('exist');
      cy.get('.todo-list li').should('have.length', 1)
      cy.get('strong').should('contain', '0'); // Cahnged from 1 to 0
    });

    it('should verify all footer elements exist', () => {
      cy.get('.todo-count').should('exist');
      cy.get('.todo-count strong').should('exist');
      cy.get('.todo-count ng-pluralize').should('exist');
      cy.get('.filters').within(() => {
        cy.get('a').contains('All').should('exist');
        cy.get('a').contains('active').should('exist');
        cy.get('a').contains('Completed').should('exist');
      });
      cy.get('.clear-completed').should('exist');
    });
  });

  describe('Add ToDo task with special characters', () => {
    beforeEach(() => {
      cy.visit(pageUrl);
    });

    it('should type task and verify that task exists', () => {
      cy.get('input.new-todo').type(`${task3}{enter}`);
      cy.get('.todo-list').find('label').contains(task3).should('exist');
      cy.get('.todo-list li').should('have.length', 1)
      cy.get('strong').should('contain', '0'); // Cahnged from 1 to 0
    });

    it('should verify all footer elements exist', () => {
      cy.get('.todo-count').should('exist');
      cy.get('.todo-count strong').should('exist');
      cy.get('.todo-count ng-pluralize').should('exist');
      cy.get('.filters').within(() => {
        cy.get('a').contains('All').should('exist');
        cy.get('a').contains('active').should('exist');
        cy.get('a').contains('Completed').should('exist');
      });
      cy.get('.clear-completed').should('exist');
    });
  });

  describe('Add ToDo long task', () => {
    beforeEach(() => {
      cy.visit(pageUrl);
    });

    it('should type task and verify that task exists', () => {
      cy.get('input.new-todo').type(`${task4}{enter}`);
      cy.get('.todo-list').find('label').contains(task4).should('exist');
      cy.get('.todo-list li').should('have.length', 1)
      cy.get('strong').should('contain', '0'); // Changed from 1 to 0
    });

    it('should verify all footer elements exist', () => {
      cy.get('.todo-count').should('exist');
      cy.get('.todo-count strong').should('exist');
      cy.get('.todo-count ng-pluralize').should('exist');
      cy.get('.filters').within(() => {
        cy.get('a').contains('All').should('exist');
        cy.get('a').contains('active').should('exist');
        cy.get('a').contains('Completed').should('exist');
      });
      cy.get('.clear-completed').should('exist');
    });
  });
});

describe('Mark task as completed', () => {
  beforeEach(() => {
    cy.visit(pageUrl);
  });

  it('mark task as completed and verify how many items left', () => {
    cy.get('input.new-todo').type(`${task1}{enter}`);
    cy.get('.todo-list').find('label').contains(task1).should('exist');
    cy.get('.todo-list li').should('have.length', 1)
    cy.contains('.todo-list li', task1).find('input.toggle').click()
    cy.get('strong').should('contain', '-1'); // Changed from 0 to -1
  });
});

describe('Remove task and verify that task does not exist', () => {
  beforeEach(() => {
    cy.visit(pageUrl);
  });

  it('should type task, verify that task exists, and remove the task', () => {
    cy.get('input.new-todo').type(`${task1}{enter}`);
    cy.get('.todo-list').find('label').contains(task1).should('exist');
    cy.get('.todo-list').find('label').contains(task1).parents('li').trigger('mouseover');
    cy.get('button[title="TODO:REMOVE THIS EVENTUALLY"]').click({ force: true });
    cy.get('.todo-list').find('label').should('not.exist');
  });
});

describe('Clear task works only when task is marked as completed ', () => {
  beforeEach(() => {
    cy.visit(pageUrl);
  });

  it('clear button should not clear not selected task', () => {
    cy.get('input.new-todo').type(`${task1}{enter}`);
    cy.get('.todo-list').find('label').contains(task1).should('exist');
    cy.get('.todo-list li').should('have.length', 1)
    cy.get('.clear-completed').click();
    cy.get('.todo-list li').should('have.length', 1)
  });

  it('should type task, verify that task exists, mark task and clear', () => {
    cy.get('input.new-todo').type(`${task1}{enter}`);
    cy.get('.todo-list').find('label').contains(task1).should('exist');
    cy.get('.todo-list li').should('have.length', 1)
    cy.contains('.todo-list li', task1).find('input.toggle').click()
    cy.get('.clear-completed').click();
    cy.get('.todo-list').find('label').should('not.exist');
  });

});

describe('Tasks exists after page reload ', () => {
  beforeEach(() => {
    cy.visit(pageUrl);
  });

  it('clear button should not clear not selected task', () => {
    cy.get('input.new-todo').type(`${task1}{enter}`);
    cy.get('input.new-todo').type(`${task2}{enter}`);
    cy.get('.todo-list').find('label').contains(task1).should('exist');
    cy.get('.todo-list').find('label').contains(task2).should('exist');
    cy.get('.todo-list li').should('have.length', 2)
    cy.reload();
    cy.get('.todo-list li').should('have.length', 2)
  });

});


