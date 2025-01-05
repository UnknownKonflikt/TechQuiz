import Quiz from './Quiz.jsx';

describe('Quiz component', () => {
    beforeEach(() => {
        cy.mount(<Quiz />);
    });

    it('should display "Start Quiz" button initially', () => {
        cy.contians('button', 'Start Quiz').should('be.visible');
    });

    it('should fetch questions when "Start Quiz" button is clicked', () => {
        cy.intercept('GET', '/api/questions', { fixture: 'questions.json' }).as('getQuestions');
        cy.mount(<Quiz />);
        cy.get('button').contains('Start Quiz').click();
        cy.wait('@getQuestions');
        cy.get('h2').should('be.visible');
    });

    it('should display a loading spinner while fetching questions', () => {
        cy.intercept('GET', '/api/questions', (req) => {
            req.reply((res) => {
                res.send([]);  // Empty response
                setTimeout(() => {
                    res.send({ fixture: 'questions.json' });
                }, 5000);
                });
            }).as('getQuestions');

            cy.mount(<Quiz />);
            cy.get('button').contains('Start Quiz').click();
            // Check if loading spinner is visible
            cy.get('spinner-border', { timeout: 6000 }).should('be.visible');
            cy.wait('@getQuestions');
        });
        it('should show "Quiz Completed" message when all questions are answered', () => {
            cy.intercept('GET', '/api/questions', { fixture: 'questions.json' }).as('getQuestions');
            cy.mount(<Quiz />);
            cy.get('button').contains('Start Quiz').click();
            cy.wait('@getQuestions');
            // Answer all questions
            cy.fixture('questions.json').then((questions) => {
                const questionCount = questions.length; // Total number of questions
                for (let i = 0; i < questionCount; i++) {
                    cy.get('button').contains('1').click();
                }
                cy.contains('Quiz Completed').should('be.visible');
    });

    it('should reset the quiz when "Start Quiz" button is clicked after quiz completion', () => {
        cy.intercept('GET', '/api/questions', { fixture: 'questions.json' }).as('getQuestions');
        cy.mount(<Quiz />);
        cy.get('button').contains('Start Quiz').click();
        cy.wait('@getQuestions');
        // Answer all questions
        cy.fixture('questions.json').then((questions) => {
            const correctAnswers = questions.answer.find(answer => answer.isCorrect).text;
            cy.contains('alert-secondary', correctAnswer)
                .parent()
                .find('button')
                .click();
        });

        //Verify completion
        cy.contains('Quiz Completed').should('be.visible');
        cy.contians('Take Quiz Again').click();

        //Verify reset
        cy.get('.card h2').should('not.contain', 'Quiz Completed');
    });
});
});
