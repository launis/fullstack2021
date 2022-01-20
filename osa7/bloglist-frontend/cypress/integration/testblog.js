const name = 'Superuser'
const username = 'root'
const password = 'password'

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: name,
      username: username,
      password: password
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
      cy.get('#username').type(username)
      cy.get('#password').type(password)
      cy.get('#login-button').click()

      cy.contains('Superuser logged in')
    })

    it('login fails with wrong password', function() {
      cy.contains('log in').click()
      cy.get('#username').type('adfaafs')
      cy.get('#password').type('pasfasf')
      cy.get('#login-button').click()


      cy.get('html').should('not.contain', 'Superuser logged in')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: username, password: password })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#Title').type('Title')
      cy.get('#Author').type('Author')
      cy.get('#Url').type('www.google.com')
      cy.get('#Likes').type(2)
      cy.get('#Save').click()

      cy.contains('Title')
    })

    describe('and a blog exist', function () {
      beforeEach(function () {
        const body = {
          title: 'Title',
          author: 'Author',
          url: 'www.google.com',
          likes: 2,
        }
        cy.createBlog(body)
      })

      it('user like a blog', function () {
        cy.contains('view').click()
        cy.get('.like').click()
      })

      describe('add more blogs', function () {
        beforeEach(function () {
          const blog1 = {
            title: 'Title 1',
            author: 'Author 1',
            url: 'www.google.com',
            likes: 22,
          }
          cy.createBlog(blog1)

          const blog2 = {
            title: 'Title 2',
            author: 'Author 2',
            url: 'www.google.com',
            likes: 33,
          }
          cy.createBlog(blog2)

          const blog3 = {
            title: 'Title 3',
            author: 'Author 3',
            url: 'www.google.com',
            likes: 15,
          }
          cy.createBlog(blog3)

          const blog4 = {
            title: 'Title 4',
            author: 'Author 4',
            url: 'www.google.com',
            likes: 11,
          }
          cy.createBlog(blog4)
        })

        it('Maximium lies title2 first', function () {
          cy.get('.title')
          cy.contains('Title 2')
        })
      })
    })
  })
})