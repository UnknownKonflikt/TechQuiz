describe ('Quiz', () => {
  beforeEach(() => {
    cy.visit('/');  // Visit the page
  });

  it ('should display the quiz page', () => {
    cy.intercept('GET', '**/api/questions/random', { fixture: 'questions.json' }).as ('getQuestions');

    //start the quiz
    cy.contains('Start Quiz').click();

    //check the first question
    cy.fixture('questions.json').then((questions) => {
      cy.get('.card h2').should ('contain', questions[0].question);  // Check the question
});

it('should complete the quiz and show the final score', () => {
  cy.intercept('GET', '**/api/questions/random', { fixture: 'questions.json' }).as('getQuestions');

  //start the quiz
  cy.contains('Start Quiz').click();
  cy.wait('@getQuestions');

  //answer the questions
  cy.fixture('questions.json').then(async (questions) => {
    for (const question of questions) {
      const correctAnswerText = question.answers.find((answer: { correct: any; }) => answer.correct).text;

      //select the correct answer
      cy.contains('.alert-secondary', correctAnswerText)
        .parent()
        .find('button')
        .click();
    }

      //Check for "quiz completed" message
      cy.contains('Quiz Completed').should('be.visible');

      //Check for the final score 
        cy.get('.alert-success').should('contain', `Your score: ${questions.length}`);
      });
    });
 

  it('should reset the quiz after completion', () => {
    cy.intercept('GET', '**/api/questions/random', { fixture: 'questions.json' }).as('getQuestions');
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');

    //answer the questions
    cy.fixture('questions.json').then((questions) => {
      for (const question of questions) {
        const correctAnswerText = question.answers.find((answer: { correct: any; }) => answer.correct).text;
        cy.contains('.alert-secondary', correctAnswerText)
          .parent()
          .find('button')
          .click();
      }
    });

    //Check for the "quiz completed" message
    cy.contains('Quiz Completed').should('be.visible');

    //Check for the final score
    cy.get('.alert-success').should('contain', 'Your score: ${questions.length}');

    //Reset the quiz
    cy.contains('Start New Quiz').click();

    //Verify that the quiz has been reset
  cy.get('.card h2').should('not contain', 'Quiz Completed');
    });
  });
});
