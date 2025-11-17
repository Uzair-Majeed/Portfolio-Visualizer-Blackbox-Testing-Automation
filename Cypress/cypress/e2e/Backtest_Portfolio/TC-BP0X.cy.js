describe('Portfolio Visualizer Backtest Tests', () => {
  beforeEach(() => {
    cy.visit('https://www.portfoliovisualizer.com/backtest-portfolio')
    cy.contains('Edit Portfolio').click()
    cy.get('.clearAllocation').click()
    cy.contains('Settings').click();
  })

  it('TC-BP01: Successful portfolio backtest execution', () => {
    cy.get('#timePeriod').select('4')
    cy.get('#startYear').select('2000')
    cy.get('#endYear').select('2020')
    cy.get('#initialAmount').clear().type('10000')
    cy.get('#annualOperation').select('0')
    cy.get('#rebalanceType').select('1')
    cy.get('#leverageType').select('0')
    cy.get('#reinvestDividends').select('true')
    cy.get('#showYield').select('true')
    cy.get('#showStyleAnalysis').select('false')
    cy.get('#showFactors').select('false')
    cy.get('#regimeType').select('')

    cy.contains('Portfolio Assets').click()

    cy.get('#benchmark').select('-1')
    cy.get('#benchmarkSymbol').clear().type('VFINX')

    cy.get('#symbol1').clear().type('Vanguard Total Stock Mkt Idx Inv (VTSMX)')
    cy.get('#allocation1_1').clear().type('60')
    cy.get('#symbol2').clear().type('Vanguard Total Bond Market Index Inv (VBMFX)')
    cy.get('#allocation2_1').clear().type('40')

    cy.get('#submitButton').click()
    cy.url().should('include', '#analysisResults')
  })

  it('TC-BP02: Multiple validation errors for invalid configuration', () => {
    cy.get('#timePeriod').select('4')
    cy.get('#startYear').select('2020')
    cy.get('#endYear').select('2010')
    cy.get('#initialAmount').clear().type('0')
    cy.get('#annualOperation').select('2')
    cy.get('#annualAdjustment').clear().type('0.0')
    cy.get('#inflationAdjusted').select('true')
    cy.get('#frequency').select('4')
    cy.get('#rebalanceType').select('5')
    cy.get('#absoluteDeviation').clear().type('5.0')
    cy.get('#relativeDeviation').clear().type('25.0')
    cy.get('#leverageType').select('0')
    cy.get('#reinvestDividends').select('true')
    cy.get('#showYield').select('false')
    cy.get('#showStyleAnalysis').select('false')
    cy.get('#showFactors').select('false')

    cy.contains('Portfolio Assets').click()

    cy.get('#benchmark').select('')

    cy.get('#symbol1').clear().type('Vanguard Total Stock Mkt Idx Inv (VTSMX)')
    cy.get('#allocation1_1').clear().type('50')
    cy.get('#symbol2').clear().type('Vanguard Total Intl Stock Index Inv (VGTSX)')
    cy.get('#allocation2_1').clear().type('50')
    cy.get('#symbol3').clear().type('Vanguard Real Estate Index Investor (VGSIX)')
    cy.get('#allocation3_1').clear().type('10')

    cy.get('#submitButton').click()

    cy.contains('Please verify the portfolio allocation amounts for portfolio').should('be.visible')
    cy.contains('Start year must be before or equal to the end year').should('be.visible')
    cy.contains('Initial portfolio balance should be a positive integer').should('be.visible')
  })

  it('TC-BP03: Advanced configuration with withdrawal validation', () => {
    cy.get('#timePeriod').select('2')
    cy.get('#startYear').select('1985')
    cy.get('#firstMonth').select('1')
    cy.get('#endYear').select('2025')
    cy.get('#lastMonth').select('12')
    cy.get('#calendarAligned').select('true')
    cy.get('#initialAmount').clear().type('1')
    cy.get('#annualOperation').select('3')
    cy.get('#annualPercentage').clear().type('100.0')
    cy.get('#frequency').select('4')
    cy.get('#rebalanceType').select('1')
    cy.get('#leverageType').select('1')
    cy.get('#leverageRatio').clear().type('1.5')
    cy.get('#debtInterest').clear().type('0.0')
    cy.get('#leveragedBenchmark').select('false')
    cy.get('#reinvestDividends').select('true')
    cy.get('#showYield').select('true')
    cy.get('#showStyleAnalysis').select('false')
    cy.get('#showFactors').select('true')
    cy.get('#factorModel').select('3')
    cy.get('#regimeType').select('')

    cy.contains('Portfolio Assets').click()

    cy.get('#benchmark').select('-1')
    cy.get('#benchmarkSymbol').clear().type('VFINX')

    cy.get('#symbol1').clear().type('Vanguard Total Stock Mkt Idx Inv (VTSMX)')
    cy.get('#allocation1_1').clear().type('100')

    cy.get('#submitButton').click()
    cy.contains('Withdrawal percentage must be between 0% and 90%').should('be.visible')
  })

  it('TC-BP04: Complex portfolio with custom settings and allocation errors', () => {
    cy.get('#timePeriod').select('2')
    cy.get('#startYear').select('1985')
    cy.get('#firstMonth').select('1')
    cy.get('#endYear').select('2025')
    cy.get('#lastMonth').select('12')
    cy.get('#calendarAligned').select('true')
    cy.get('#initialAmount').clear().type('1')
    cy.get('#annualOperation').select('3')
    cy.get('#annualPercentage').clear().type('89.0')
    cy.get('#frequency').select('4')
    cy.get('#rebalanceType').select('1')
    cy.get('#leverageType').select('2')
    cy.get('#debtAmount').clear().type('02-102-221')
    cy.get('#debtInterest').clear().type('0.0')
    cy.get('#maintenanceMargin').clear().type('25.0')
    cy.get('#leveragedBenchmark').select('false')
    cy.get('#reinvestDividends').select('true')
    cy.get('#showYield').select('true')
    cy.get('#showStyleAnalysis').select('false')
    cy.get('#showFactors').select('true')
    cy.get('#factorModel').select('3')
    cy.get('#regimeType').select('')

    cy.contains('Portfolio Assets').click()

    cy.get('#portfolioNames').select('true')
    cy.get('#portfolioName1').clear().type('Custom')
    cy.get('#portfolioName2').clear().type('TEST')
    cy.get('#portfolioName3').clear().type('TEST3')

    cy.get('#benchmark').select('-1')
    cy.get('#benchmarkSymbol').clear().type('VFINX')

    cy.get('#symbol1').clear().type('Vanguard Total Stock Mkt Idx Inv (VTSMX)')
    cy.get('#allocation1_1').clear().type('-10')
    cy.get('#symbol2').clear().type('Vanguard Total Intl Stock Index Inv (VGTSX)')
    cy.get('#allocation2_1').clear().type('110')

    cy.get('#submitButton').click()
    cy.contains('Short positions are not allowed with leveraged portfolio').should('be.visible')
  })

  it('TC-BP05: Boundary value and ticker validation errors', () => {
    cy.get('#timePeriod').select('2')
    cy.get('#startYear').select('1985')
    cy.get('#firstMonth').select('1')
    cy.get('#endYear').select('2025')
    cy.get('#lastMonth').select('12')
    cy.get('#calendarAligned').select('true')
    cy.get('#initialAmount').clear().type('100'.repeat(100))
    cy.get('#annualOperation').select('1')
    cy.get('#annualAdjustment').clear().type('0')
    cy.get('#inflationAdjusted').select('true')
    cy.get('#frequency').select('4')
    cy.get('#rebalanceType').select('1')
    cy.get('#leverageType').select('0')
    cy.get('#reinvestDividends').select('true')
    cy.get('#showYield').select('true')
    cy.get('#showStyleAnalysis').select('false')
    cy.get('#showFactors').select('false')
    cy.get('#regimeType').select('')

    cy.contains('Portfolio Assets').click()

    cy.get('#portfolioNames').select('false')

    cy.get('#benchmark').select('-1')
    cy.get('#benchmarkSymbol').clear().type('INVALID')

    cy.get('#symbol1').clear().type('Vanguard Total Stock Mkt Idx Inv (VTSMX)')
    cy.get('#allocation1_1').clear().type('90')
    cy.get('#symbol2').clear().type('Vanguard Total Intl Stock Index Inv (VGTSX)')
    cy.get('#allocation2_1').clear().type('10')

    cy.get('#submitButton').click()

    cy.contains('Invalid field value for field "initialAmount"').should('be.visible')
    cy.contains('Unknown ticker symbol').should('be.visible')
  })
})