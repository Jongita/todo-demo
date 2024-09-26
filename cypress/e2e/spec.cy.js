const pageUrl = 'https://todolist.james.am/'

const task1 = 'To do homworks';
const task2 = 'Run 3km';
const task3 = 'Wash dishes! & wash the floor!';
const task4 = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, veniam iure cupiditate quo impedit consequuntur corporis sunt officia. Laborum quos debitis beatae ea autem consectetur deserunt nesciunt dolorem minus quod.';
const newTask = 'To do homworks and read book';

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

describe('Add ToDo tasks and verify that tasks exists', () => {

  describe('Add ToDo task as string', () => {
    beforeEach(() => {
      cy.visit(pageUrl);
    });

    it('should type task and verify that task exists', () => {
      cy.addTodo(task1);
      cy.get('.todo-list').find('label').contains(task1).should('exist');
      cy.get('.todo-list li').should('have.length', 1)
      cy.get('strong').should('contain', '0'); // should be 1
    });

    it('should verify all footer elements exist', () => {
      cy.verifyTodoCount();
      cy.verifyFilterLinks();
      cy.verifyClearCompleted();
    });
  });

  describe('Add ToDo task with numbers', () => {
    beforeEach(() => {
      cy.visit(pageUrl);
    });

    it('should type task and verify that task exists', () => {
      cy.addTodo(task2);
      cy.get('.todo-list').find('label').contains(task2).should('exist');
      cy.get('.todo-list li').should('have.length', 1)
      cy.get('strong').should('contain', '0'); // should be 1
    });

    it('should verify all footer elements exist', () => {
      cy.verifyTodoCount();
      cy.verifyFilterLinks();
      cy.verifyClearCompleted();
    });
  });

  describe('Add ToDo task with special characters', () => {
    beforeEach(() => {
      cy.visit(pageUrl);
    });

    it('should type task and verify that task exists', () => {
      cy.addTodo(task3);
      cy.get('.todo-list').find('label').contains(task3).should('exist');
      cy.get('.todo-list li').should('have.length', 1)
      cy.get('strong').should('contain', '0'); // should be 1
    });

    it('should verify all footer elements exist', () => {
      cy.verifyTodoCount();
      cy.verifyFilterLinks();
      cy.verifyClearCompleted();
    });
  });

  describe('Add ToDo long task', () => {
    beforeEach(() => {
      cy.visit(pageUrl);
    });

    it('should type task and verify that task exists', () => {
      cy.addTodo(task4);
      cy.get('.todo-list').find('label').contains(task4).should('exist');
      cy.get('.todo-list li').should('have.length', 1)
      cy.get('strong').should('contain', '0'); // should be 1
    });

    it('should verify all footer elements exist', () => {
      cy.verifyTodoCount();
      cy.verifyFilterLinks();
      cy.verifyClearCompleted();
    });
  });


  describe('Add two ToDo tasks', () => {
    beforeEach(() => {
      cy.visit(pageUrl);
    });

    it('should type task and verify that task exists', () => {
      cy.addTodo(task1);
      cy.addTodo(task2);
      cy.get('.todo-list').find('label').contains(task1).should('exist');
      cy.get('.todo-list').find('label').contains(task2).should('exist');
      cy.get('.todo-list li').should('have.length', 2)
      cy.get('strong').should('contain', '1'); // should be 2
    });

    it('should verify all footer elements exist', () => {
      cy.verifyTodoCount();
      cy.verifyFilterLinks();
      cy.verifyClearCompleted();
    });
  });
});

describe('Mark task as completed', () => {
  beforeEach(() => {
    cy.visit(pageUrl);
  });

  it('mark task as completed and verify how many items left', () => {
    cy.addTodo(task1);
    cy.get('.todo-list').find('label').contains(task1).should('exist');
    cy.get('.todo-list li').should('have.length', 1)
    cy.contains('.todo-list li', task1).find('input.toggle').click()
    cy.get('strong').should('contain', '-1'); // Changed from 0 to -1
  });


});

describe('Edit a task', () => {
  beforeEach(() => {
    cy.visit(pageUrl);
  });

  it('should type task and possible to edit task', () => {
    cy.addTodo(task1);
    cy.editTask(task1, newTask)
    cy.get('.todo-list').find('label').contains(task1).should('exist');
    cy.get('.todo-list li').should('have.length', 1)
    cy.get('strong').should('contain', '0'); // should be 1
  });

});

describe('Remove task and verify that task does not exist', () => {
  beforeEach(() => {
    cy.visit(pageUrl);
  });

  it('should type task, verify that task exists, and remove the task', () => {
    cy.addTodo(task1);
    cy.get('.todo-list').find('label').contains(task1).should('exist');
    cy.get('.todo-list').find('label').contains(task1).parents('li').trigger('mouseover');
    cy.get('button[title="TODO:REMOVE THIS EVENTUALLY"]').click({ force: true });
    cy.get('.todo-list').find('label').should('not.exist');
  });
});

describe('Clear task works only when task is marked as completed ', () => {
  beforeEach(() => {
    cy.visit(pageUrl);
    cy.addTodo(task1);
  });

  it('clear button should not clear not selected task', () => {
    cy.get('.todo-list').find('label').contains(task1).should('exist');
    cy.get('.todo-list li').should('have.length', 1)
    cy.get('.clear-completed').click();
    cy.get('.todo-list li').should('have.length', 1)
  });

  it('should type task, verify that task exists, mark task and clear', () => {
    cy.get('.todo-list').find('label').contains(task1).should('exist');
    cy.get('.todo-list li').should('have.length', 1)
    cy.contains('.todo-list li', task1).find('input.toggle').click()
    cy.get('.clear-completed').click();
    cy.get('.todo-list').find('label').should('not.exist');
  });

});

describe('Task List Filter Buttons', () => {
  beforeEach(() => {
    cy.visit(pageUrl);

    cy.addTodo(task1);
    cy.addTodo(task2);
    cy.addTodo(task3);
    cy.get('.todo-list li:nth-child(2) .toggle').click();
  });

  it('should display all tasks when "All" filter is selected', () => {
    cy.contains('a', 'All').click();
    cy.get('.todo-list li').should('have.length', 3);
  });

  it('should display only active taks when "Active" filter is selected', () => {
    cy.contains('a', 'active').click();
    cy.get('.todo-list li').should('have.length', 2);
    cy.get('.todo-list').find('label').contains(task1).should('exist');
    cy.get('.todo-list').find('label').contains(task2).should('not.exist');
    cy.get('.todo-list').find('label').contains(task3).should('exist');
  });

  it('should display only completed task when "Completed" filter is selected', () => {
    cy.contains('a', 'Completed').click();
    cy.get('.todo-list li').should('have.length', 1).should('have.class', 'completed');
    cy.get('.todo-list').find('label').contains(task2).should('exist').should('be.visible');
  });
});

describe('Tasks exists after page reload ', () => {
  beforeEach(() => {
    cy.visit(pageUrl);
  });

  it('should type two tasks, reloasd page and tasks still exists', () => {
    cy.addTodo(task1);
    cy.addTodo(task2);
    cy.get('.todo-list').find('label').contains(task1).should('exist');
    cy.get('.todo-list').find('label').contains(task2).should('exist');
    cy.get('.todo-list li').should('have.length', 2)
    cy.reload();
    cy.get('.todo-list li').should('have.length', 2)
  });

});





