const baseUrl = 'https://www.portfoliovisualizer.com/manage-market-regimes'

describe('Market Regime Management', () => {
    beforeEach(() => {
        cy.visit('https://www.portfoliovisualizer.com/login');
        cy.get('#username').type('52480killer@gmail.com');
        cy.get('#password').type('12345678');
        cy.get('#rememberLogin').check();
        cy.get('#submitButton').click();
        cy.visit(baseUrl);
        cy.get('#createRegimeButton').click();
    });

    it('TC-REG01: All nominal, partial regime config', () => {
        cy.get('#name').type('Volatility Regime');
        cy.get('#description').type('VIX-based');
        cy.get('#symbolDefined').select('true');
        cy.get('#sourceSymbol').type('VTSIX');
        cy.get('#seriesType').select('Monthly Index Values');
        cy.get('#regimeType').select('Value Breakdown');
        cy.get('#smoothingFactor').select('None');
        cy.get('#defaultRegimeLabel').type('Normal Market');
        cy.get('#comparisonType1').select('>=');
        cy.get('#threshold1').type('20');
        cy.get('#label1').type('High');
        cy.get('#comparisonType2').select('>=');
        cy.get('#threshold2').type('15');
        cy.get('#label2').type('Elevated');
        cy.get('#sortOrder').select('Chronological');
        cy.get('#submitButton').click();
        cy.url().should('include', 'manage-market-regimes');
        cy.contains('Volatility Regime').should('exist');
    });

    it('TC-REG02: Smoothing/quantile logic, alternative type', () => {
        cy.get('#name').type('Quintile Regime');
        cy.get('#symbolDefined').select('true');
        cy.get('#sourceSymbol').type('SPY');
        cy.get('#seriesType').select('Monthly Returns');
        cy.get('#regimeType').select('Quintile');
        cy.get('#smoothingFactor').select('6');
        cy.get('#submitButton').click();
        cy.url().should('include', 'manage-market-regimes');
        cy.contains('Quintile Regime').should('exist');
    });

    it('TC-REG03: File import, dislocation config', () => {
        cy.get('#name').type('Custom Import');
        cy.get('#description').type('some description');
        cy.get('#symbolDefined').select('false');
        cy.get('#seriesType').select('Monthly Index Values');
        cy.get('#regimeType').select('Dislocation');
        cy.get('#dislocationPeriod').select('3 months');
        cy.get('#dislocationDirection').select('Up');
        cy.get('input[name="upload"]').selectFile('cypress/fixtures/regime.csv');
        cy.get('#submitButton').click();
        cy.url().should('include', 'manage-market-regimes');
        cy.contains('Custom Import').should('exist');
    });

    it('TC-REG04: Validation errors on all invalid/boundaries', () => {
        cy.get('#name').type('FBHFDSBFHSBFHSBFHSBFSBFHSBFHSBHDSBJI'.repeat(20));
        cy.get('#symbolDefined').select('false');
        cy.get('#seriesType').select('Monthly Returns');
        cy.get('#regimeType').select('Value Breakdown');
        cy.get('#smoothingFactor').select('12');
        cy.get('#defaultRegimeLabel').type('DJANDKJSANDJAKNUKDNASJKDNAJKNDA'.repeat(20));
        cy.get('#comparisonType1').select('>=');
        cy.get('#threshold1').type('-23131331321313');
        cy.get('#label1').clear();
        cy.get('#comparisonType2').select('<');
        cy.get('#threshold2').clear();
        cy.get('#label2').type('FJSNFSDJNKJSF'.repeat(20));
        cy.get('#comparisonType3').select('>=');
        cy.get('#threshold3').clear();
        cy.get('#label3').type('56652316%^%%'.repeat(20));
        cy.get('#sortOrder').select('Numerical');
        cy.get('input[name="upload"]').selectFile('cypress/fixtures/New Text Document.txt');
        cy.get('#submitButton').click();
        cy.contains('Data file is expected to be in Excel or CSV format. No Excel or CSV file extension detected:').should('be.visible');
        cy.contains('No regime name specified for threshold: -23131331321313').should('be.visible');
    });

    it('TC-REG05: All regime levels at max, smoothing max', () => {
        cy.get('#symbolDefined').select('true');
        cy.get('#sourceSymbol').type('INVALIDDDD');
        cy.get('#seriesType').select('Monthly Returns');
        cy.get('#regimeType').select('Value Breakdown');
        cy.get('#smoothingFactor').select('12');
        cy.get('#defaultRegimeLabel').type('Neutral');
        cy.get('#comparisonType1').select('>=');
        cy.get('#threshold1').type('30');
        cy.get('#label1').type('Extreme');
        cy.get('#comparisonType2').select('<');
        cy.get('#threshold2').type('25');
        cy.get('#label2').type('VHigh');
        cy.get('#comparisonType3').select('>=');
        cy.get('#threshold3').type('15');
        cy.get('#label3').type('Elevated');
        cy.get('#comparisonType4').select('>=');
        cy.get('#threshold4').type('10');
        cy.get('#label4').type('Normal');
        cy.get('#sortOrder').select('Numerical');
        cy.get('#submitButton').click();
        cy.contains('No source series found for ticker symbol: INVALIDDDD').should('be.visible');
    });
});