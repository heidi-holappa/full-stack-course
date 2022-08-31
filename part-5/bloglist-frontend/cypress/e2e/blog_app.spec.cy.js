describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Pertti Peruna',
      username: 'peruna',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('BlogApp')
    cy.contains('Login')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
    cy.contains('cancel')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('peruna')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('Pertti Peruna logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('vale-peruna')
      cy.get('#password').type('anasalas')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'peruna', password: 'salasana' })
    })

    it('a blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title-input').type('a new blog created by cypress')
      cy.get('#author-input').type('Created by Cypress')
      cy.get('#url-input').type('https://created-by-cypress.com')
      cy.contains('save').click()
      cy.contains('a new blog created by cypress')
    })

    it('a blog can be liked', function() {
      cy.createBlog({
        title: 'a new blog created by cypress',
        author: 'Created by Cypress',
        url: 'https://created-by-cypress.com'
      })
      cy.contains('a new blog created by cypress')
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('Likes 1')
    })

    it('a blog can be deleted', function() {
      cy.createBlog({
        title: 'a new blog created by cypress',
        author: 'Created by Cypress',
        url: 'https://created-by-cypress.com'
      })
      cy.contains('a new blog created by cypress')
      cy.contains('view').click()
      cy.contains('remove').click()
    })

    describe('and several blogs exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'testing blogApp - part 1',
          author: 'Created by Cypress',
          url: 'https://created-by-cypress.com'
        })

        cy.createBlog({
          title: 'testing blogApp - part 2',
          author: 'Created by Cypress',
          url: 'https://created-by-cypress.com'
        })

        cy.createBlog({
          title: 'testing blogApp - part 3',
          author: 'Created by Cypress',
          url: 'https://created-by-cypress.com'
        })
      })

      it.only('blog are sorted based on likes', function() {
        cy.contains('part 3').contains('view').click()
        cy.contains('part 3').contains('like').click()
        cy.contains('part 3').contains('view').click()

        cy.contains('part 3').contains('view').click()
        cy.contains('part 3').contains('like').click()
        cy.contains('part 3').contains('view').click()

        cy.contains('part 1').contains('view').click()
        cy.contains('part 1').contains('like').click()
        cy.contains('part 1').contains('view').click()

        cy.get('.blog').eq(0).should('contain', 'testing blogApp - part 3')
        cy.get('.blog').eq(1).should('contain', 'testing blogApp - part 1')
        cy.get('.blog').eq(2).should('contain', 'testing blogApp - part 2')
      })

    })
  })
})