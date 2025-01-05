
# Tech Quiz Test Suite

## Overview

The **Tech Quiz** is an interactive quiz application built with the **MERN stack** (MongoDB, Express, React, Node.js). This application allows users to take a quiz consisting of ten random questions, answer them, and view their final score. The app includes both a React-based frontend and a Node.js/Express backend that fetches random quiz questions from an API and records the user's score.

This project emphasizes the importance of **robust testing** and ensures that the application is **reliable and efficient**. As part of this project, Cypress has been integrated to provide comprehensive tests for both **component testing** and **end-to-end testing**, allowing the quiz application to meet user demands and perform reliably under various conditions.

## Features

- **Randomized Quiz Questions**: Users are presented with ten random questions, ensuring that every quiz experience is unique.
- **Score Calculation**: After completing the quiz, users are shown their final score based on the number of correct answers.
- **Cypress Integration**: Both **component tests** and **end-to-end tests** are implemented to ensure the functionality and reliability of the application.


### Prerequisites

To get started with this project, make sure you have the following installed on your local machine:

- **Node.js** (version 18 or higher)
- **npm** (Node Package Manager)
- **MongoDB** (local or a cloud instance)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/tech-quiz.git
   cd tech-quiz
   ```

2. **Install backend dependencies**:
   In the `server` directory, install the necessary packages:
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**:
   In the `client` directory, install the necessary packages:
   ```bash
   cd client
   npm install
   ```

4. **Install Cypress for testing**:
   Install Cypress as a dev dependency:
   ```bash
   npm install cypress --save-dev
   ```

### Configuration

1. **Configure the backend**:
   Ensure that MongoDB is running and connected properly. If you’re using a local instance, start MongoDB by running:
   ```bash
   mongod
   ```

   You can configure the database connection in the backend code (under `server/config` or similar).

2. **Configure the frontend**:
   Set up your React app to connect with the backend. The frontend will use API requests to fetch quiz questions and post the final score.

3. **Configure Cypress for testing**:
   Cypress comes with pre-configured testing setup. For both component and end-to-end testing, the basic configuration is ready to use out-of-the-box.

   In the `cypress.json` file, ensure that the URL for your app is set correctly:
   ```json
   {
     "baseUrl": "http://localhost:3000"
   }
   ```

   To ensure smooth component testing, ensure the necessary setup for React components in `cypress/support/component.js`.

### Running the Application

1. **Start the backend server**:
   In the `server` directory, run:
   ```bash
   npm run dev
   ```

2. **Start the frontend client**:
   In the `client` directory, run:
   ```bash
   npm run dev
   ```

3. **Access the app**:
   Open your browser and visit `http://localhost:3000` to view the Tech Quiz application.

### Running Tests with Cypress

Cypress provides an easy way to run both **component tests** and **end-to-end tests**.

1. **Open Cypress Test Runner**:
   To launch the Cypress Test Runner, run the following command:
   ```bash
   npx cypress open
   ```

   This will open the Cypress GUI, where you can select the tests you want to run.

2. **Run End-to-End Tests**:
   End-to-end tests are located in the `cypress/integration` directory. These tests simulate real user interactions with the application and ensure that the entire flow works as expected.

   To run the end-to-end tests, simply select the relevant test file in the Cypress Test Runner.

3. **Run Component Tests**:
   Component tests are located in the `cypress/component` directory. These tests focus on individual components and ensure that they render and behave correctly.

   You can run component tests through the Cypress GUI or by using the following command:
   ```bash
   npx cypress run --component
   ```

### Example Tests

#### Component Test

- **Test**: Ensure the Quiz component displays a question and possible answers correctly.
  ```js
  describe('Quiz Component', () => {
    it('should display the first question correctly', () => {
      cy.fixture('questions.json').then((questions) => {
        cy.mount(<Quiz questions={questions} />);
        cy.get('.card h2').should('contain', questions[0].question);
      });
    });
  });
  ```

#### End-to-End Test

- **Test**: Ensure the entire quiz flow works correctly from starting the quiz to displaying the final score.
  ```js
  describe('Quiz Flow', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('should start the quiz and show the first question', () => {
      cy.contains('Start Quiz').click();
      cy.fixture('questions.json').then((questions) => {
        cy.get('.card h2').should('contain', questions[0].question);
      });
    });

    it('should complete the quiz and show the score', () => {
      cy.contains('Start Quiz').click();
      cy.fixture('questions.json').then((questions) => {
        questions.forEach((question) => {
          cy.contains('.alert-secondary', question.correctAnswer).parent().find('button').click();
        });
      });
      cy.contains('Quiz Completed').should('be.visible');
      cy.get('.alert-success').should('contain', 'Your score: 10');
    });
  });
  ```

## Conclusion

This **Tech Quiz Test Suite** showcases the power of testing with **Cypress**, ensuring that both individual components and the overall application flow are thoroughly tested. By incorporating both **component testing** and **end-to-end testing**, we can confidently deploy the quiz app knowing it performs reliably under various conditions.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This README provides a clear and professional guide for the project, covering installation, configuration, testing, and usage. It helps users and developers easily get started with the project and understand the purpose of each step.
