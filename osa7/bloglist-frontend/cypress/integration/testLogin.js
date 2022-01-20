describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Superuser',
      username: 'root',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('log in')

  })

  describe('Login',function() {
    it('user can login with good credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('root')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
  
      cy.contains('Superuser logged in')
    })
  
    it('login fails with wrong password', function() {
      cy.contains('log in').click()
      cy.get('#username').type('root')
      cy.get('#password').type('p')
      cy.get('#login-button').click()
  
  
      cy.get('html').should('not.contain', 'Superuser logged in')
    })
  })
})