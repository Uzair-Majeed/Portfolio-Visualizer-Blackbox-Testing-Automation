describe('Portfolio Visualizer Asset Correlation', () => {
  const url = 'https://www.portfoliovisualizer.com/asset-correlations';

  function fillAndSubmit({
    tickers,
    startDate,
    endDate,
    correlationBasis,
    rollingDays,
    rollingMonths,
  }) {
    cy.visit(url);

    if (tickers !== undefined) cy.get('#symbols').clear().type(tickers);
    if (startDate !== undefined) cy.get('#startDate').clear().type(startDate);
    if (endDate !== undefined) cy.get('#endDate').clear().type(endDate);
    if (correlationBasis !== undefined) cy.get('#timePeriod').select(correlationBasis);
    if (rollingDays !== undefined)
      cy.get('#tradingDays').select(rollingDays);
    if (rollingMonths !== undefined)
      cy.get('#months').select(rollingMonths);

    cy.get('#submitButton').click();
  }

  it('TC-AC01: One ticker, earliest allowed date, daily, rolling 20', () => {
    fillAndSubmit({
      tickers: 'VTI',
      startDate: '01/01/1900',
      endDate: '01/01/1900',
      correlationBasis: 'Daily Returns',
      rollingDays: '20 Trading Days'
    });
    cy.contains('At least two ticker symbols are required').should('exist');
    cy.contains('Please select a longer time period').should('exist');
  });

  it('TC-AC02: Four tickers, valid range, monthly, rolling 36', () => {
    fillAndSubmit({
      tickers: 'VTI VNQ GLD BND',
      startDate: '01/01/2010',
      endDate: '12/31/2020',
      correlationBasis: 'Monthly Returns',
      rollingMonths: '36 Months'
    });
    cy.get('table').should('exist');
  });

  it('TC-AC03: Empty ticker, too early start, future end, annual', () => {
    fillAndSubmit({
      startDate: '01/01/1899',
      endDate: '12/31/2030',
      correlationBasis: 'Annual Returns'
    });
    cy.contains('At least two ticker symbols are required').should('exist');
    cy.contains('End date must be before current date').should('exist');
  });

  it('TC-AC04: Invalid tickers, future start, end before start, monthly, rolling 60', () => {
    fillAndSubmit({
      tickers: 'LONG'.repeat(30),
      startDate: '01/29/2026',
      endDate: '10/24/2025',
      correlationBasis: 'Monthly Returns',
      rollingMonths: '60 Months'
    });
    cy.contains('At least two ticker symbols are required').should('exist');
    cy.contains('Start date must be before end date').should('exist');
  });

  it('TC-AC05: Valid and invalid tickers with special chars, valid dates, daily, rolling 120', () => {
    fillAndSubmit({
      tickers: 'VTI INAVLIDS HJSBFHDBS^^%$#*()!)(@*',
      startDate: '01/03/2023',
      endDate: '07/10/2024',
      correlationBasis: 'Daily Returns',
      rollingDays: '120 Trading Days'
    });
    cy.contains('Unknown symbol').should('exist');
  });

  it('TC-AC06: Lowercase tickers, wrong format dates, monthly, rolling 36', () => {
    fillAndSubmit({
      tickers: 'VTI VNQ GLD BND',
      startDate: '10/20',
      endDate: '1/11',
      correlationBasis: 'Monthly Returns',
      rollingMonths: '36 Months'
    });
    cy.contains('Invalid field value for field "startDate"').should('exist');
    cy.contains('Invalid field value for field "endDate"').should('exist');
  });

  it('TC-AC07: Valid tickers, non-existent dates, monthly, rolling 36', () => {
    fillAndSubmit({
      tickers: 'VTI VNQ GLD BND',
      startDate: '0/0/0220',
      endDate: '0/0/0110',
      correlationBasis: 'Monthly Returns',
      rollingMonths: '36 Months'
    });
    cy.contains('Invalid field value for field "startDate"').should('exist');
    cy.contains('Invalid field value for field "endDate"').should('exist');
  });
});
