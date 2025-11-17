describe('Asset Backfill Configuration Tests', () => {
    const url = 'https://www.portfoliovisualizer.com/manage-backfills';

    beforeEach(() => {
        cy.visit('https://www.portfoliovisualizer.com/login');
        cy.get('#username').type('52480killer@gmail.com');
        cy.get('#password').type('12345678');
        cy.get('#rememberLogin').check();
        cy.get('#submitButton').click();
        cy.visit(url);
    });

    function fillBackfill(index, asset, backfill) {
        cy.get(`#bfticker${index}`).clear().type(asset);
        cy.get(`#bfproxy${index}`).clear().type(backfill);
    }

    it('TC-ABF01', () => {
        cy.get('#backfillOldestShareClass').select('false');
        fillBackfill(1, 'AAPL', 'AAPLX');
        cy.get('#submitBackfillsButton').invoke('removeAttr', 'disabled').click();
        cy.url().should('include', 'manage-backfills');
        cy.contains('Changes saved').should('exist');
    });

    it('TC-ABF02', () => {
        cy.get('#backfillOldestShareClass').select('true');

        const assets = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'FB', 'NVDA', 'NFLX', 'SPY', 'QQQ'];
        const backfills = ['AAPLX', 'MSFTX', 'GOOGLX', 'AMZNX', 'TSLAX', 'FBX', 'NVDAX', 'NFLXX', 'SPYX', 'QQQX'];

        for (let i = 0; i < assets.length; i++) {
            fillBackfill(i + 1, assets[i], backfills[i]);
            cy.wait(5000);
        }

    cy.get('#submitBackfillsButton').invoke('removeAttr', 'disabled').click();
    cy.url().should('include', 'manage-backfills');
    cy.contains('Changes saved').should('exist');
    });

    it('TC-ABF03', () => {
        cy.get('#backfillOldestShareClass').select('true');
        fillBackfill(1, 'BADTICKER', 'BADBACKFILL');
        fillBackfill(2, 'SPY', 'MSFT');
        cy.get('#submitBackfillsButton').invoke('removeAttr', 'disabled').click();
        //this was defect logged in assignment 3, so this test case shouldnt run correct
        cy.contains('Invalid').should('exist');
        cy.get('#bfticker2').should('have.value', 'SPY');
        cy.get('#bfproxy2').should('have.value', 'MSFT');
    });

    it('TC-ABF04', () => {
        cy.get('#backfillOldestShareClass').select('true');
        fillBackfill(1,'LONG'.repeat(30),'LONG'.repeat(30))
        cy.get('#submitBackfillsButton').invoke('removeAttr', 'disabled').click();
        cy.url().should('include', 'manage-backfills');
        cy.contains('Invalid ticker symbol for asset on row 1').should('exist');
        cy.contains('Invalid backfill symbol for asset on row 1').should('exist');
    });
});
