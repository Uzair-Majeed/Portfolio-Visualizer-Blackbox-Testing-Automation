describe('Signup Form Tests', () => {

  beforeEach(() => {
    cy.visit('https://www.portfoliovisualizer.com/sign-up')
  })

  it('TC-S01 - All valid fields (Academic)', () => {
    cy.get('#profileType').select('Academic')
    cy.get('#country').select('Pakistan')
    cy.get('#marketRegion').select('North America')
    cy.get('#firstName').type('Uzair')
    cy.get('#lastName').type('Majeed')
    cy.get('#email').type('uzairmjd886@gmail.com')
    cy.get('#password').type('Abc12345')
    cy.get('#confirmPassword').type('Abc12345')

    cy.get('.g-recaptcha iframe').should('exist')
    cy.get('#submitButton').click()

    cy.contains(`Please check the "I'm not a robot" checkbox for reCAPTCHA code verification.`, { matchCase: false })
  })

  it('TC-S02 - Multiple required fields missing', () => {
    cy.get('#submitButton').click()

    cy.contains('Please select profile type', { matchCase: false })
    cy.contains('First name not specified', { matchCase: false })
    cy.contains('Last name not specified', { matchCase: false })
    cy.contains('Email not specified', { matchCase: false })
    cy.contains('Password not specified', { matchCase: false })
  })

  it('TC-S03 - Multiple invalid formats', () => {
    cy.get('#profileType').select('Individual Investor')
    cy.get('#country').select('Pakistan')
    cy.get('#marketRegion').select('North America')
    cy.get('#firstName').type('Uzair123')
    cy.get('#lastName').type('Majeed@')
    cy.get('#email').type('uzair.gmail.com')
    cy.get('#password').type('Abc123')
    cy.get('#confirmPassword').type('Different123')

    cy.get('#submitButton').click()

    cy.contains('Name is not valid', { matchCase: false })
    cy.contains('Email address is not valid', { matchCase: false })
    cy.contains('Password should have at least 8 characters', { matchCase: false })
  })

  it('TC-S04 - Boundary maximum values', () => {
    const maxFirst = 'A'.repeat(50)
    const maxLast = 'B'.repeat(50)
    const maxPass = 'Abc12345678901234567'

    cy.get('#profileType').select('Individual Investor')
    cy.get('#country').select('Pakistan')
    cy.get('#marketRegion').select('North America')
    cy.get('#firstName').type(maxFirst)
    cy.get('#lastName').type(maxLast)
    cy.get('#email').type('narrator886@gmail.com')
    cy.get('#password').type(maxPass)
    cy.get('#confirmPassword').type(maxPass)

    cy.get('#submitButton').click()
    cy.contains(`Please check the "I'm not a robot" checkbox for reCAPTCHA code verification.`, { matchCase: false })
  })

  it('TC-S05 - Boundary exceeded values', () => {
    const longFirst = 'A'.repeat(51)
    const longLast = 'B'.repeat(51)
    const longEmail = 'a'.repeat(243) + '@gmail.com'

    cy.get('#profileType').select('Individual Investor')
    cy.get('#country').select('Pakistan')
    cy.get('#marketRegion').select('North America')
    cy.get('#firstName').type(longFirst)
    cy.get('#lastName').type(longLast)
    cy.get('#email').type(longEmail)
    cy.get('#password').type('Abc1234')
    cy.get('#confirmPassword').type('Abc1234')

    cy.get('#submitButton').click()

    cy.contains('Email address is not valid', { matchCase: false })
    cy.contains('Password should have at least 8 characters', { matchCase: false })
  })
})
