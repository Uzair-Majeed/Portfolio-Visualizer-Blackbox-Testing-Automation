describe('Fund Factor Regression Tests', () => {

    beforeEach(() => {
        cy.visit('https://www.portfoliovisualizer.com/etf-and-mutual-fund-factor-regressions');
    });

    it('TC-FF01: ETF, US Equity, 3-Factor, 24 Months, R² >= 70%', () => {
        
        cy.get('#factorDataSet').select('Fama-French Research Factors');
        cy.get('#marketArea').select('United States');
        cy.get('#factorModel').select('Three-Factor Model');
        cy.get('#fundType').select('ETF');
        cy.get('#fundCategory').select('US Equity Funds');
        cy.get('#timePeriod').select('24 Months');
        cy.get('#threshold').select('70');

        // Save table content before clicking
        cy.get('table tbody').invoke('text').then(beforeText => {
            cy.get('#submitButton').click();
            // Check that table content updated
            cy.get('table tbody').invoke('text').should(afterText => {
                expect(afterText).not.to.eq(beforeText);
            });
        });
    });

    it('TC-FF02: Mutual Fund, Intl Equity, 6-Factor, 48 Months, R² >= 80%', () => {
        cy.get('#factorDataSet').select('AQR Factors');
        cy.get('#marketArea').select('Intl Developed Ex US');
        cy.get('#factorModel').select('Six-Factor Model');
        cy.get('#fundType').select('Mutual Fund');
        cy.get('#fundCategory').select('Intl Equity Funds');
        cy.get('#timePeriod').select('48 Months');
        cy.get('#threshold').select('80');

        cy.get('table tbody').invoke('text').then(beforeText => {
            cy.get('#submitButton').click();
            cy.get('table tbody').invoke('text').should(afterText => {
                expect(afterText).not.to.eq(beforeText);
            });
        });
    });

    it('TC-FF03: Closed-End Fund, Fixed Income, 4-Factor + Term+Credit, 60 Months, R² >= 90%', () => {
        cy.get('#factorDataSet').select('Alpha Architect Factors');
        cy.get('#marketArea').select('United States');
        cy.get('#factorModel').select('Four-Factor Model');
        cy.get('#fixedIncomeFactorModel').select('Term + Credit');
        cy.get('#fundType').select('Closed-End Fund');
        cy.get('#fundCategory').select('Fixed Income');
        cy.get('#timePeriod').select('60 Months');
        cy.get('#threshold').select('90');

        cy.get('table tbody').invoke('text').then(beforeText => {
            cy.get('#submitButton').click();
            cy.get('table tbody').invoke('text').should(afterText => {
                expect(afterText).not.to.eq(beforeText);
            });
        });
    });

    it('TC-FF04: All Funds, Alternatives, No Factor Model, Maximum Time, R² >= 95%', () => {
        cy.get('#factorDataSet').select('Fama-French Research Factors');
        cy.get('#marketArea').select('United States');
        cy.get('#factorModel').select('None');
        cy.get('#fixedIncomeFactorModel').select('None');
        cy.get('#fundType').select('All');
        cy.get('#fundCategory').select('Alternatives');
        cy.get('#timePeriod').select('Maximum');
        cy.get('#threshold').select('95');

        cy.get('table tbody').invoke('text').then(beforeText => {
            cy.get('#submitButton').click();
            cy.get('table tbody').invoke('text').should(afterText => {
                expect(afterText).not.to.eq(beforeText);
            });
        });
    });

});
