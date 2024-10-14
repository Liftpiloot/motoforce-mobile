describe('Register Functionality', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/register');
    });

    it('should register successfully with valid credentials', () => {
        const uniqueId = Date.now();
        const uniqueName = `testname${uniqueId}`;
        const uniqueEmail = `testemail${uniqueId}@example.com`;

        cy.get('input[type="text"]').eq(0).type(uniqueName); // Name input
        cy.get('input[type="text"]').eq(1).type(uniqueEmail); // Email input
        cy.get('input[type="password"]').type('testpassword'); // Password input
        cy.get('button').contains('Sign up').click();

        // Assert that the user is redirected to the dashboard
        cy.url().should('include', '/dashboard');
    });

    it('should show an error message with existing username or email', () => {
        cy.get('input[type="text"]').eq(0).type('existingname'); // Name input
        cy.get('input[type="text"]').eq(1).type('existingemail@example.com'); // Email input
        cy.get('input[type="password"]').type('testpassword'); // Password input
        cy.get('button').contains('Sign up').click();

        // Assert that the error message is displayed
        cy.get('.error-message').should('contain', 'Username or email already exists');
    });
});