describe('Portfolio Visualizer Login Form', () => {

  it('TC-LO1: Successful login with valid credentials and Stay Signed In', () => {
    cy.visit('https://www.portfoliovisualizer.com/login');
    cy.get('#username').type('uzairmjd886@gmail.com');
    cy.get('#password').type('triumphantly64');
    cy.get('#rememberLogin').check();
    cy.get('#submitButton').click();

    cy.url().should('not.include', '/login');
    cy.contains('analysis').should('exist'); // Adjust to your post-login page
  });

  it('TC-LO2: Both fields empty shows required validation errors', () => {
    cy.visit('https://www.portfoliovisualizer.com/login');
    cy.get('#rememberLogin').uncheck();
    cy.get('#submitButton').click();

    cy.contains('User account not specified').should('exist'); 
  });

  it('TC-LO3: Too long email (256+), short password (7 chars) shows invalid error', () => {
    cy.visit('https://www.portfoliovisualizer.com/login');
    cy.get('#username').type('a'.repeat(256));
    cy.get('#password').type('abcdefg');
    cy.get('#rememberLogin').uncheck();
    cy.get('#submitButton').click();

    cy.contains('Email address not correct').should('exist');
  });

  it('TC-LO4: Unregistered email + wrong password triggers invalid credentials error', () => {
    cy.visit('https://www.portfoliovisualizer.com/login');
    cy.get('#username').type('unregistered@example.com');
    cy.get('#password').type('WrongPassword');
    cy.get('#rememberLogin').uncheck();
    cy.get('#submitButton').click();

    cy.contains('The email address or password is incorrect').should('exist');
  });

});
