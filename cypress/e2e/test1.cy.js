/// <reference types="cypress" />

describe('Register page Cypress', () => {
   it('error message checking when all fields are empty', () => {

      cy.visit('https://etherscan.io/register');
      cy.url().should('include', 'register') //check correct url address
      cy.get('#btnCookie').click(); // accept cookies

      cy.viewport(1920, 1080)
      cy.get('input[name="ctl00$ContentPlaceHolder1$btnRegister"]')
         .scrollIntoView()
         .click()
      cy.wait(2000)

      cy.get('.invalid-feedback')
         .should('have.length', 6)
         .should('exist');
   });
   it('register user and redirect page', () => {
      cy.visit('https://etherscan.io/register');
      cy.url().should('include', 'register') //check correct url address
      cy.get('#btnCookie').click(); // accept cookies
      cy.get('input.form-control.form-control-lg.py-3[name="ctl00$ContentPlaceHolder1$txtUserName"]')
         .focus()
         .type(',.,.,..,.')
         .should('have.value', ',.,.,..,.')
      cy.get('.invalid-feedback')
         .should('have.text', 'Only alphanumeric characters allowed.')
      cy.get('input[name="ctl00$ContentPlaceHolder1$txtUserName"]')
         .clear()
         .should('have.value', '')
         .type('Daca')
         .should('have.value', 'Daca')
      cy.get('.invalid-feedback')
         .should('have.text', 'Please enter at least 5 characters.')
      cy.get('input[name="ctl00$ContentPlaceHolder1$txtUserName"]')
         .clear()
         .should('have.value', '')
         .type('Daca1')
         .should('have.value', 'Daca1')
      cy.get('.invalid-feedback')
         .should('not.be.visible')

      //email
      cy.get('input.form-control.form-control-lg.py-3[name="ctl00$ContentPlaceHolder1$txtEmail"]')
         .focus()
         .type('dacagmail.com')
         .should('have.value', 'dacagmail.com')
      cy.get('.invalid-feedback')
         .should('have.text', 'Please enter a valid email address.')
      cy.get('input[name="ctl00$ContentPlaceHolder1$txtEmail"]')
         .clear()
         .should('have.value', '')
         .type('daca@gmail.com')
         .should('have.value', 'daca@gmail.com')
      cy.get('.invalid-feedback')
         .should('not.be.visible')

      //confrm email
      cy.get('input.form-control.form-control-lg.py-3[name="ctl00$ContentPlaceHolder1$txtConfirmEmail"]')
         .focus()
         .type('ivana.com')
         .should('have.value', 'ivana.com')
      cy.get('.invalid-feedback')
         .should('have.text', 'Please re-enter your email address.')
      cy.get('input[name="ctl00$ContentPlaceHolder1$txtConfirmEmail"]')
         .clear()
         .should('have.value', '')
         .type('ivana@gmail.com')
         .should('have.value', 'ivana@gmail.com')
      cy.get('.invalid-feedback')
         .should('have.text', 'Email address does not match.')
      cy.get('input[name="ctl00$ContentPlaceHolder1$txtConfirmEmail"]')
         .clear()
         .should('have.value', '')
         .type('daca@gmail.com')
         .should('have.value', 'daca@gmail.com')
      cy.get('.invalid-feedback')
         .should('not.be.visible')


      //password
      cy.get('input.form-control.form-control-lg.py-3[name="ctl00$ContentPlaceHolder1$txtPassword"]')
         .focus()
         .type('daca')
         .should('have.value', 'daca')
      cy.get('.invalid-feedback')
         .should('have.text', 'Your password must be at least 8 characters long.')
      cy.get('input[name="ctl00$ContentPlaceHolder1$txtPassword"]')
         .clear()
         .should('have.value', '')
         .type('danilo123')
         .should('have.value', 'danilo123')
      cy.get('.invalid-feedback')
         .should('not.be.visible')


      //confirm password
      cy.get('input.form-control.form-control-lg.py-3[name="ctl00$ContentPlaceHolder1$txtPassword2"]')
         .focus()
         .type('daca')
         .should('have.value', 'daca')
      cy.get('.invalid-feedback')
         .should('have.text', 'Your password must be at least 8 characters long.')
      cy.get('input[name="ctl00$ContentPlaceHolder1$txtPassword2"]')
         .clear()
         .should('have.value', '')
         .type('ivana123')
         .should('have.value', 'ivana123')
      cy.get('.invalid-feedback')
         .should('have.text', 'Password does not match, please check again.')
      cy.get('input[name="ctl00$ContentPlaceHolder1$txtPassword2"]')
         .clear()
         .should('have.value', '')
         .type('danilo123')
         .should('have.value', 'danilo123')
      cy.get('.invalid-feedback')
         .should('not.be.visible')
         .get('.progress-label')
         .should(($progressLabel) => {
            expect($progressLabel).to.exist;
            expect($progressLabel).to.have.css('color', 'rgb(165, 42, 42)');
            expect($progressLabel.text().trim()).to.equal('Medium!');
         })
         .get('.progress-bar')
         .should(($progressBar) => {
            expect($progressBar).to.exist;
            expect($progressBar).to.have.css('background-color', 'rgb(165, 42, 42)');
         });
      cy.viewport(1920, 1080)
      cy.wait(2000)
      cy.get('#showMultiPassIcon1')
         .click()
      cy.get('input[name="ctl00$ContentPlaceHolder1$txtPassword"]')
         .focus()
         .should('have.attr', 'type', 'text')
      cy.get('input[name="ctl00$ContentPlaceHolder1$txtPassword2"]')
         .should('have.attr', 'type', 'text');

      cy.get('#showMultiPassIcon1')
         .click()
      cy.get('input[name="ctl00$ContentPlaceHolder1$txtPassword"]')
         .should('have.attr', 'type', 'password')
      cy.get('input[name="ctl00$ContentPlaceHolder1$txtPassword2"]')
         .should('have.attr', 'type', 'password')


      //checkbox
      cy.get('#ContentPlaceHolder1_MyCheckBox')
         .click()
         .should('be.checked')
      cy.get('#ContentPlaceHolder1_SubscribeNewsletter')
         .click()
         .should('be.checked')

      //Register
      cy.get('input[name="ctl00$ContentPlaceHolder1$btnRegister"]')
         .click()
      cy.get('.alert.alert-danger[role=alert]')
         .should('be.visible')
      cy.contains('Error! Invalid captcha response')
         .should('be.visible')

   })
})
