describe('Login Functionality', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
    });

    it('should log in successfully with valid credentials', () => {
        cy.get('input[type="text"]').type('testlogin');
        cy.get('input[type="password"]').type('testlogin');
        cy.get('button').contains('Login').click();

        cy.url().should('include', '/dashboard');
    });

    it('should display an error message with invalid credentials', () => {
        cy.get('input[type="text"]').type('invalid');
        cy.get('input[type="password"]').type('invalid');
        cy.get('button').contains('Login').click();

        cy.get('.error-message').should('contain', 'Username or password is incorrect');
    });

    it('should redirect to the dashboard page if the user was logged in with remember me and returns to the login page', () => {
        cy.get('input[type="text"]').type('testlogin');
        cy.get('input[type="password"]').type('testlogin');
        cy.get('input[type="checkbox"]').check();
        cy.get('button').contains('Login').click();
        cy.url().should('include', '/dashboard');
        cy.visit('http://localhost:5173/login');
        cy.url().should('include', '/dashboard');
    });

    it ('should not redirect to the dashboard if the user was logged in without remember me and returns to the login page', () => {
        cy.get('input[type="text"]').type('testlogin');
        cy.get('input[type="password"]').type('testlogin');
        cy.get('button').contains('Login').click();
        cy.url().should('include', '/dashboard');
        cy.visit('http://localhost:5173/login');
        cy.url().should('include', '/login');
    });

    it('should redirect to the register page when the register link is clicked', () => {
        cy.get('a').contains('Register').click();

        cy.url().should('include', '/register');
    });
});