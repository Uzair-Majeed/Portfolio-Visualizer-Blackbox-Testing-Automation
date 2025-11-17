describe('Fund Screener Tests', () => {

  beforeEach(() => {
    cy.visit('https://www.portfoliovisualizer.com/fund-screener')
  })

  it('TC-FS01 - All filters set to All', () => {
    cy.get('#fundType').select('All')
    cy.get('#assetClass').select('All')
    cy.get('#benchmarkName').select('All')
    cy.get('#performanceHistoryPeriod').select('All')
    cy.get('#expenseRatio').select('All')
    cy.get('#submitButton').click()
    cy.url().should('include', '#analysisResults')
  })

  it('TC-FS02 - ETF, U.S. Equity, S&P 500 TR, 3+ years, <0.25%', () => {
    cy.get('#fundType').select('ETF')
    cy.get('#assetClass').select('U.S. Equity')
    cy.get('#benchmarkName').select('S&P 500 TR USD')
    cy.get('#performanceHistoryPeriod').select('3 or more years')
    cy.get('#expenseRatio').select('< 0.25%')
    cy.get('#submitButton').click()
    cy.url().should('include', '#analysisResults')
  })

  it('TC-FS03 - Mutual Fund, Taxable Bond, Russell 1000 TR USD, 5+ years, <0.50%', () => {
    cy.get('#fundType').select('Mutual Fund')
    cy.get('#assetClass').select('Taxable Bond')
    cy.get('#benchmarkName').select('Russell 1000 TR USD')
    cy.get('#performanceHistoryPeriod').select('5 or more years')
    cy.get('#expenseRatio').select('< 0.50%')
    cy.get('#submitButton').click()
    cy.url().should('include', '#analysisResults')
  })

  it('TC-FS04 - Closed-End Fund, International Equity, MSCI ACWI Ex USA, 10+ years, <0.75%', () => {
    cy.get('#fundType').select('Closed-End Fund')
    cy.get('#assetClass').select('International Equity')
    cy.get('#benchmarkName').select('MSCI ACWI Ex USA NR USD')
    cy.get('#performanceHistoryPeriod').select('10 or more years')
    cy.get('#expenseRatio').select('< 0.75%')
    cy.get('#submitButton').click()
    cy.url().should('include', '#analysisResults')
  })

  it('TC-FS05 - ETF, Municipal Bond, Commodity, 15+ years, <1.00%', () => {
    cy.get('#fundType').select('ETF')
    cy.get('#assetClass').select('Municipal Bond')
    cy.get('#benchmarkName').select('Bloomberg Commodity TR USD')
    cy.get('#performanceHistoryPeriod').select('15 or more years')
    cy.get('#expenseRatio').select('< 1.00%')
    cy.get('#submitButton').click()
    cy.url().should('include', '#analysisResults')
  })

  it('TC-FS06 - Mutual Fund, 3 asset classes, 20+ years, All expenses', () => {
    cy.get('#fundType').select('Mutual Fund')
    cy.get('#assetClass').select('Sector Equity')
    cy.get('#assetClass').select('Allocation')
    cy.get('#assetClass').select('Alternative')
    cy.get('#performanceHistoryPeriod').select('20 or more years')
    cy.get('#expenseRatio').select('All')
    cy.get('#submitButton').click()
    cy.url().should('include', '#analysisResults')
  })

  it('TC-FS07 - Closed-End Fund, final 3 asset classes, 25+ years, <0.50%', () => {
    cy.get('#fundType').select('Closed-End Fund')
    cy.get('#assetClass').select('Commodities')
    cy.get('#assetClass').select('Miscellaneous')
    cy.get('#assetClass').select('Nontraditional Equity')
    cy.get('#performanceHistoryPeriod').select('25 or more years')
    cy.get('#expenseRatio').select('< 0.50%')
    cy.get('#submitButton').click()
    cy.url().should('include', '#analysisResults')
  })
})
