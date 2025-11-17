describe('Portfolio Visualizer Monte Carlo Simulation', () => {
  beforeEach(() => {
    cy.visit('https://www.portfoliovisualizer.com/monte-carlo-simulation');
  });

  it('TC-MCS01: Simulation runs successfully', () => {
    cy.get('#mode').select('2');
    cy.get('#initialAmount').click().clear().type('1000000');
    cy.get('#adjustmentType').select('2');
    cy.get('#adjustmentAmount').clear().type('45000');
    cy.get('#inflationAdjusted').select('true');
    cy.get('#years').select('30');
    cy.get('#taxTreatment').select('false');
    cy.get('#simulationModel').select('1');
    cy.get('#fullHistory').select('true');
    cy.get('#sequenceStressTest').select('0');
    cy.get('#inflationModel').select('1');
    cy.get('#rebalanceType').select('1');
    
    cy.get('input[name="symbol1"]').type('VTI');
    cy.get('input[name="allocation1_1"]').clear().type('60');
    cy.get('input[name="symbol2"]').type('BND');
    cy.get('input[name="allocation2_1"]').clear().type('40');
    
    cy.get('#submitButton').click();
    cy.url().should('include', '#analysisResults');
  });

  it('TC-MCS02: Accepts upper boundaries', () => {
    cy.get('#mode').select('1');
    cy.get('#initialAmount').click().clear().type('10000000');
    cy.get('#adjustmentType').select('4');
    cy.get('#currentAge').select('95');
    cy.get('#years').select('75');
    cy.get('#taxTreatment').select('false');
    cy.get('#simulationModel').select('4');
    cy.get('input[name="riskFreeRate"]').clear().type('50.0');
    cy.get('select[name="historicalVolatility"]').select('false');
    cy.get('select[name="historicalCorrelations"]').select('true');
    cy.get('#sequenceStressTest').select('0');
    cy.get('#inflationModel').select('2');
    cy.get('input[name="inflationMean"]').clear().type('99.9');
    cy.get('input[name="inflationVolatility"]').clear().type('100.0');
    cy.get('#rebalanceType').select('1');
    
    cy.get('select[name="asset1"]').select('MidCapValue');
    cy.get('input[name="allocation1_1"]').clear().type('60');
    cy.get('input[name="mean1"]').clear().type('50');
    cy.get('input[name="volatility1"]').clear().type('100');
    cy.get('select[name="asset2"]').select('IntlSmall');
    cy.get('input[name="allocation2_1"]').clear().type('40');
    cy.get('input[name="mean2"]').clear().type('50');
    cy.get('input[name="volatility2"]').clear().type('100');
    
    cy.get('#submitButton').click();
    cy.url().should('include', '#analysisResults');
  });

  it('TC-MCS03: Expect validation errors - No portfolio allocation', () => {
    cy.get('#mode').select('2');
    cy.get('#initialAmount').click().clear().type('1');
    cy.get('#adjustmentType').select('4');
    cy.get('#currentAge').select('30');
    cy.get('#years').select('5');
    cy.get('#taxTreatment').select('true');
    cy.get('input[name="incomeTax"]').clear().type('0.0');
    cy.get('input[name="capitalGainsTax"]').clear().type('0.0');
    cy.get('input[name="dividendTax"]').clear().type('0.0');
    cy.get('input[name="affordableCareActTax"]').clear().type('0.0');
    cy.get('input[name="stateTax"]').clear().type('0.0');
    cy.get('#simulationModel').select('4');
    cy.get('input[name="riskFreeRate"]').clear().type('0.1');
    cy.get('select[name="historicalVolatility"]').select('true');
    cy.get('select[name="historicalCorrelations"]').select('true');
    cy.get('#sequenceStressTest').select('0');
    cy.get('#inflationModel').select('2');
    cy.get('input[name="inflationMean"]').clear().type('0.0');
    cy.get('input[name="inflationVolatility"]').clear().type('0.0');
    cy.get('#rebalanceType').select('1');
    
    cy.get('input[name="symbol1"]').type('VTSMX');
    cy.get('input[name="allocation1_1"]').clear().type('0');
    
    cy.get('#submitButton').click();
    cy.contains('No portfolio allocation specified').should('be.visible');
  });

  it('TC-MCS04: Parameterized/dynamic case', () => {
    cy.get('#mode').select('2');
    cy.get('#initialAmount').click().clear().type('1');
    cy.get('#adjustmentType').select('0');
    cy.get('#years').select('5');
    cy.get('#taxTreatment').select('false');
    cy.get('#simulationModel').select('3');
    cy.get('input[name="riskFreeRate"]').clear().type('0.1');
    cy.get('input[name="meanReturn"]').clear().type('7.0');
    cy.get('input[name="volatility"]').clear().type('12.0');
    cy.get('#sequenceStressTest').select('0');
    cy.get('#inflationModel').select('2');
    cy.get('input[name="inflationMean"]').clear().type('4.0');
    cy.get('input[name="inflationVolatility"]').clear().type('3.0');
    cy.get('#customIntervals').select('true');
    cy.get('input[name="percentileList"]').clear().type('10, 25, 50, 75, 90');
    cy.get('input[name="returnList"]').clear().type('0, 2.5, 5, 7.5, 10, 12.5');
    
    cy.get('#submitButton').click();
    cy.url().should('include', '#analysisResults');
  });

  it('TC-MCS05: Expect error/field rejection', () => {
    cy.get('#mode').select('2');
    cy.get('#initialAmount').click().clear().type('0');
    cy.get('#adjustmentType').select('2');
    cy.get('#adjustmentAmount').clear().type('1-1-00000100111000000001220410042109');
    cy.get('#inflationAdjusted').select('true');
    cy.get('#years').select('5');
    cy.get('#taxTreatment').select('false');
    cy.get('#simulationModel').select('1');
    cy.get('#fullHistory').select('false');
    cy.get('select[name="startYear"]').select('1972');
    cy.get('select[name="endYear"]').select('2024');
    cy.get('#sequenceStressTest').select('0');
    cy.get('#inflationModel').select('2');
    cy.get('input[name="inflationMean"]').clear().type('-4.0');
    cy.get('input[name="inflationVolatility"]').clear().type('-3.0');
    cy.get('#rebalanceType').select('1');
    cy.get('#customIntervals').select('true');
    cy.get('input[name="percentileList"]').clear().type('-10, 25, 50, 75, 90');
    cy.get('input[name="returnList"]').clear().type('0, 2.5, 5, 7.5, 10, 12.5');
    
    cy.get('input[name="symbol1"]').type('INVALID');
    cy.get('input[name="allocation1_1"]').clear().type('-10');
    
    cy.get('#submitButton').click();
    cy.contains('Unknown symbol: INVALID').should('be.visible');
    cy.contains('Invalid percentile interval value: -10. Expected values are from 1 to 99').should('be.visible');
    cy.contains('Initial portfolio balance should be a $1.00 or greater').should('be.visible');
    cy.contains('Please specify expected inflation between 0% and 100%').should('be.visible');
    cy.contains('Inflation volatility cannot be negative').should('be.visible');
  });

  it('TC-MCS06: Expect validation errors - Invalid field values', () => {
    cy.get('#mode').select('2');
    cy.get('#initialAmount').click().clear().type('100000000000000000000000001');
    cy.get('#adjustmentType').select('3');
    cy.get('input[name="adjustmentPercentage"]').clear().type('2.0E24');
    cy.get('#years').select('75');
    cy.get('#taxTreatment').select('false');
    cy.get('#simulationModel').select('3');
    cy.get('input[name="riskFreeRate"]').clear().type('100.1');
    cy.get('input[name="meanReturn"]').clear().type('100.1');
    cy.get('input[name="volatility"]').clear().type('100.1');
    cy.get('#sequenceStressTest').select('0');
    cy.get('#inflationModel').select('2');
    cy.get('input[name="inflationMean"]').clear().type('101.0');
    cy.get('input[name="inflationVolatility"]').clear().type('2.0E8');
    
    cy.get('#submitButton').click();
    cy.contains('Invalid field value for field "initialAmount"').should('be.visible');
    cy.contains('Please specify expected return between -100% and 100%').should('be.visible');
    cy.contains('Please specify expected inflation between 0% and 100%').should('be.visible');
  });

  it('TC-MCS07: All cashflow switches, interval types', () => {
    cy.get('#mode').select('2');
    cy.get('#initialAmount').click().clear().type('1');
    cy.get('#adjustmentType').select('6');
    cy.get('input[name="adjustmentPercentage"]').clear().type('10');
    cy.get('select[name="smoothingRate"]').select('75');
    cy.get('#years').select('75');
    cy.get('#taxTreatment').select('false');
    cy.get('#simulationModel').select('1');
    cy.get('#fullHistory').select('false');
    cy.get('select[name="startYear"]').select('2024');
    cy.get('select[name="endYear"]').select('2021');
    cy.get('#sequenceStressTest').select('10');
    cy.get('#inflationModel').select('2');
    cy.get('input[name="inflationMean"]').clear().type('10.0');
    cy.get('input[name="inflationVolatility"]').clear().type('10');
    cy.get('#rebalanceType').select('1');
    cy.get('#customIntervals').select('true');
    cy.get('input[name="percentileList"]').clear().type('10, 25, 50, 75, 90');
    cy.get('input[name="returnList"]').clear().type('0, 2.5, 5, 7.5, 10, 12.5');
    
    cy.get('input[name="symbol1"]').type('GGDPX');
    cy.get('input[name="allocation1_1"]').clear().type('100');
    
    cy.get('#submitButton').click();
    cy.contains('At least 10 full years of history required for historical returns model').should('be.visible');
    cy.contains('Start year must be before or equal to the end year').should('be.visible');
  });
});