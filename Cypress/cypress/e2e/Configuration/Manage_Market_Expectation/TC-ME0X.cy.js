describe('Market Expectations Test Cases', () => {

    beforeEach(() => {
        cy.visit('https://www.portfoliovisualizer.com/login');
        cy.get('#username').type('52480killer@gmail.com');
        cy.get('#password').type('12345678');
        cy.get('#submitButton').click();
        cy.visit('https://www.portfoliovisualizer.com/manage-market-expectations');
    });

  it('TC-ME01: Three valid asset rows saves successfully', () => {
    cy.get('#fatype1').select('1');
    cy.get('#faac1').select('EmergingMarket');
    cy.get('#fareturn1').clear().type('10');
    cy.get('#favolatility1').clear().type('18');
    cy.get('#fatype2').select('1');
    cy.get('#faac2').select('TotalBond');
    cy.get('#fareturn2').clear().type('5.0');
    cy.get('#favolatility2').clear().type('4.0');
    cy.get('#fatype3').select('1');
    cy.get('#faac3').select('US Large Cap');
    cy.get('#fareturn3').clear().type('8.0');
    cy.get('#favolatility3').clear().type('12.0');
    cy.get('#submitExpectationsButton').click();
    cy.contains('Changes saved').should('exist');
  });

  it('TC-ME02: Mixed valid/invalid asset rows yields proper validation errors', () => {
    cy.get('#fatype1').select('2');
    cy.get('#faticker1').clear().type('AAPL');
    cy.get('#fareturn1').clear().type('12');
    cy.get('#favolatility1').clear().type('20');
    cy.get('#fatype2').select('2');
    cy.get('#faticker2').clear().type('A');
    cy.get('#fareturn2').clear().type('0');
    cy.get('#favolatility2').clear().type('0.1');
    cy.get('#fatype3').select('2');
    const longWord = "LONG".repeat(50);
    cy.get('#faticker3').clear().type(longWord);
    cy.get('#fareturn3').clear().type('100.0');
    cy.get('#favolatility3').clear().type('100.0');
    cy.get('#fatype4').select('1');
    cy.get('#faac4').select('EmergingMarket');
    cy.get('#fareturn4').clear().type('-100.0');
    cy.get('#favolatility4').clear().type('25.0');
    cy.get('#fatype5').select('1');
    cy.get('#faac5').select('TotalBond');
    cy.get('#fareturn5').clear().type('101.0');
    cy.get('#favolatility5').clear().type('0.0');
    cy.get('#fatype6').select('1');
    cy.get('#faac6').select('TotalStockMarket');
    cy.get('#fareturn6').clear().type('-101.0');
    cy.get('#favolatility6').clear().type('-5.0');
    cy.get('#fareturn7').clear().type('abc');
    cy.get('#favolatility7').clear().type('xyz');
    cy.get('#submitExpectationsButton').click();
    cy.contains('Expected volatility must be positive for asset on row 5').should('exist');
    cy.contains('Expected volatility must be positive for asset on row 6').should('exist');
  });
});
