/// <reference types="cypress"/>

describe('User registration scenario', () => {
  it('Check the email and password input field', () => {
    cy.visit('https://etherscan.io/register')
    cy.wait(2000)
    cy.get('#btnCookie').click()
    cy.get('#ContentPlaceHolder1_txtUserName').type('Ivana', { force: true })
    cy.get('#ContentPlaceHolder1_txtEmail').type('ivana.com', { force: true })
    cy.get('#ContentPlaceHolder1_txtEmail-error').should('be.visible').and('have.text', 'Please enter a valid email address.');
    cy.wait(2000)
    cy.get('#ContentPlaceHolder1_txtEmail').clear().type('ivana@gmail.com', { force: true })
    cy.get('#ContentPlaceHolder1_txtEmail-error').should('not.be.visible');
    cy.get('#ContentPlaceHolder1_txtConfirmEmail').type('ivana.com', { force: true });
    cy.get('#ContentPlaceHolder1_txtConfirmEmail-error').should('be.visible').and('have.text', 'Please re-enter your email address.');
    cy.wait(2000)
    cy.get('#ContentPlaceHolder1_txtConfirmEmail').clear().type('ivana123@gmail.com', { force: true });
    cy.get('#ContentPlaceHolder1_txtConfirmEmail-error').should('be.visible').and('have.text','Email address does not match.');
    cy.wait(2000)
    cy.get('#ContentPlaceHolder1_txtConfirmEmail').clear().type('ivana@gmail.com', { force: true });
    cy.wait(2000)
    cy.get('#ContentPlaceHolder1_txtConfirmEmail-error').should('not.be.visible');
    cy.get('#ContentPlaceHolder1_btnRegister').click({ force: true })
    cy.wait(2000)
    cy.get('#ContentPlaceHolder1_txtPassword-error').should('be.visible').and('have.text', 'Please enter Password.');
    cy.get('#ContentPlaceHolder1_txtPassword2-error').should('be.visible').and('have.text', 'Your password must be at least 8 characters long.');
    cy.get('#ctl00\\$ContentPlaceHolder1\\$MyCheckBox-error').should('be.visible').and('have.text', 'Please accept our Terms and Conditions.')
    cy.get('#ContentPlaceHolder1_txtPassword').type('Ivana12345', { force: true })
    cy.get('.progress-label').should('have.text', 'Medium!')
    cy.get('#ContentPlaceHolder1_txtPassword2').type('Ivana123456', { force: true })
    cy.get('#ContentPlaceHolder1_txtPassword2-error').should('be.visible').and('have.text', 'Password does not match, please check again.');
    cy.wait(2000)
    cy.get('#ContentPlaceHolder1_txtPassword2').clear().type('Ivana12345', { force: true })
    cy.get('#ContentPlaceHolder1_txtPassword-error').should('not.be.visible');
    cy.get('#ContentPlaceHolder1_MyCheckBox').click({ force: true })
    cy.get('#ContentPlaceHolder1_SubscribeNewsletter').click({ force: true })
    cy.wait(2000)
    cy.get('#ContentPlaceHolder1_btnRegister').click({ force: true })
    cy.get('.alert.alert-danger[role=alert]').should('be.visible')
    cy.contains('Error! Invalid captcha response').should('be.visible')
    cy.wait(2000)
  })
})







