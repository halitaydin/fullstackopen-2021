describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Halit Aydin',
      newusername: 'Obi-Wan Kenobi',
      newpassword: '123456'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    const user2 = {
      name: 'Halit Aydin',
      newusername: 'Luke Skywalker',
      newpassword: '123456'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('Signup & Login forms are shown', function() {
    cy.contains('Sign-Up Panel')
    cy.contains('Log-in Panel')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('Obi-Wan Kenobi')
      cy.get('#password').type('123456')
      cy.get('#login-button').click()
      cy.contains('Obi-Wan Kenobi logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('Obi-Wan Kenobi')
      cy.get('#password').type('12345')
      cy.get('#login-button').click()
      cy.get('.error').contains('Wrong username or password')
      cy.get('.error').should('contain', 'Wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Obi-Wan Kenobi', password:'123456' })
      cy.contains('create new blog').click()
      cy.get('input').then( inputs => {
        cy.wrap(inputs[0]).type('ReactJs')
        cy.wrap(inputs[1]).type('Dan Abramov')
        cy.wrap(inputs[2]).type('www.reactjs.org')
      })
      cy.get('#create-button').click()
      cy.contains('view').click()
    })

    it('A blog can be created', function() {
      cy.get('.success').contains('a new blog ReactJs by Obi-Wan Kenobi added')
    })

    it('Like button', function() {
      cy.contains('like').click()
      cy.contains('likes: 1')
    })

    it('Remove button', function() {
      cy.contains('remove').click()
      cy.get('.success').contains('ReactJs blog deleted')
    })

    it('check that other users cannot delete the blog', function() {
      cy.contains('log out').click()
      cy.login({ username: 'Luke Skywalker', password:'123456' })
      cy.contains('view').click()
      cy.get('#blog').should('not.contain', 'remove')
    })

    it.only('order according to the likes', function() {
      cy.contains('log out').click()
      cy.login({ username: 'Luke Skywalker', password:'123456' })
      cy.contains('create new blog').click()
      cy.get('input').then( inputs => {
        cy.wrap(inputs[0]).type('Bir gun tek basina')
        cy.wrap(inputs[1]).type('Vedat Turkali')
        cy.wrap(inputs[2]).type('www.roman.com')
      })
      cy.get('#create-button').click()
      cy.contains('view').click()
      cy.contains('view').click()
      cy.get('#blogLists')
      cy.get('button').then((buttons) => {
        cy.wrap(buttons[5]).click()
        cy.wrap(buttons[7]).click()
        cy.wrap(buttons[7]).click()
        cy.wait(500)
      })
      cy.get('#blogLists')
        .get('.blogTitle').then((title) => {
          cy.get(title[0]).should('contain', 'Bir gun tek basina')
        })
    })
  })
})