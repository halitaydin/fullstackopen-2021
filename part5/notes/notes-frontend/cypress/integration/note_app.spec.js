describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Halit Aydin',
      username: 'Obi-Wan Kenobi',
      password: '123456'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('then example', function() {
    cy.get('button').then( buttons => {
      console.log('number of buttons', buttons.length)
      cy.wrap(buttons[0]).click()
    })
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2021')
  })

  it('login form can be opened', function() {
    cy.contains('log in').click()
  })

  it('user can login', function () {
    cy.contains('log in').click()
    cy.get('#username').type('Obi-Wan Kenobi')
    cy.get('#password').type('123456')
    cy.get('#login-button').click()
    cy.contains('Obi-Wan Kenobi logged in')
  })

  it('login fails with wrong password', function() {
    cy.contains('log in').click()
    cy.get('#username').type('Obi-Wan Kenobi')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    // cy.get('.error').contains('Wrong credentials')
    // cy.get('.error').should('contain', 'Wrong credentials')
    // cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    // cy.get('.error').should('have.css', 'border-style', 'solid')

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Obi-Wan Kenobi logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Obi-Wan Kenobi', password: '123456' })
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('show all').click()
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({ content: 'another note cypress', important: false })
        cy.contains('show all').click()
      })

      it('it can be made important', function () {
        cy.contains('another note cypress')
        cy.contains('make important')
          .click()
        cy.contains('another note cypress')
        cy.contains('make not important')
      })
    })

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
        cy.contains('show all').click()
      })

      // it('one of those can be made important', function () {
      //   cy.contains('second note')
      //     .contains('make important')
      //     .click()

      //   cy.contains('second note')
      //     .contains('make not important')
      // })

      it('other of those can be made important', function () {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })
    })
  })
})
