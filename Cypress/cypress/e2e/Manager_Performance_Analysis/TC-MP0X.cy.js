describe('Manager Performance Tests', () => {
  beforeEach(() => {
    cy.visit('https://www.portfoliovisualizer.com/manager-performance')
  })

  it('TC-MP01: Successful manager performance analysis', () => {
    cy.get('#symbol').clear().type('Fidelity Low-Priced Stock (FLPSX)')
    cy.get('#benchmarkSymbol').clear().type('Vanguard Mid-Cap Value ETF (VOE)')
    cy.get('#factorSource').select('2')
    cy.get('#regressionMethod').select('2')
    cy.get('#regimePerformance').select('false')
    cy.get('#startDate').clear().type('1/1/2015')
    cy.get('#endDate').clear().type('12/31/2025')
    cy.get('#periodicity').select('2')
    cy.get('#rollingPeriod').select('36')

    cy.get('#submitButton').click()
    cy.url().should('include', '#analysisResults')
  })

  it('TC-MP02: Invalid date format', () => {
    cy.get('#symbol').clear()
    cy.get('#benchmarkSymbol').clear()
    cy.get('#factorSource').select('0')
    cy.get('#regimePerformance').select('true')
    cy.get('#regimeType').select('Market Volatility')
    cy.get('#regimeAnalysis').select('2')
    cy.get('#startDate').clear().type('69/69/0011')
    cy.get('#endDate').clear().type('98/98/0201')
    cy.get('#periodicity').select('3')
    cy.get('#rollingPeriod').select('3')

    cy.get('#submitButton').click()

    cy.contains('Invalid field value for field "startDate"').should('exist')
    cy.contains('Invalid field value for field "endDate"').should('exist')
  })

  it('TC-MP03: missing data/TICKERS', () => {
    cy.get('#symbol').clear()
    cy.get('#benchmarkSymbol').clear()
    cy.get('#factorSource').select('0')
    cy.get('#regimePerformance').select('true')
    cy.get('#regimeType').select('Market Volatility')
    cy.get('#regimeAnalysis').select('2')
    cy.get('#startDate').clear().type('02/01/2011')
    cy.get('#endDate').clear().type('08/08/2024')
    cy.get('#periodicity').select('3')
    cy.get('#rollingPeriod').select('3')

    cy.get('#submitButton').click()

    cy.contains('No fund or benchmark found for ID null').should('exist')
  })

  it('TC-MP04: Insufficient data period error', () => {
    cy.get('#symbol').clear().type('Fidelity Low-Priced Stock (FLPSX)')
    cy.get('#benchmarkSymbol').clear().type('Vanguard Mid-Cap Value ETF (VOE)')
    cy.get('#factorSource').select('1')
    cy.get('#regressionMethod').select('2')
    cy.get('#regimePerformance').select('true')
    cy.get('#regimeType').select('Market Volatility')
    cy.get('#regimeAnalysis').select('1')
    cy.get('#startDate').clear().type('01/01/2035')
    cy.get('#endDate').clear().type('01/31/2055')
    cy.get('#periodicity').select('2')
    cy.get('#rollingPeriod').select('60')

    cy.get('#submitButton').click()

    cy.contains('At least 3 months of data required for analysis').should('be.visible')
    cy.contains('the available or selected time period is shorter').should('be.visible')
  })

  it('TC-MP05: Start date after end date error', () => {
    cy.get('#symbol').clear().type('Fidelity Low-Priced Stock (FLPSX)')
    cy.get('#benchmarkSymbol').clear().type('Vanguard Mid-Cap Value ETF (VOE)')
    cy.get('#factorSource').select('1')
    cy.get('#regressionMethod').select('2')
    cy.get('#regimePerformance').select('true')
    cy.get('#regimeType').select('Market Volatility')
    cy.get('#regimeAnalysis').select('1')
    cy.get('#startDate').clear().type('10/01/2025')
    cy.get('#endDate').clear().type('01/31/1900')
    cy.get('#periodicity').select('3')
    cy.get('#rollingPeriod').select('3')

    cy.get('#submitButton').click()

    cy.contains('Start date must be before end date').should('be.visible')
  })
})