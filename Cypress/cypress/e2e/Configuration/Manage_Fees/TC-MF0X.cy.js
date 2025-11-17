describe('Manage Fees Test Cases', () => {
    beforeEach(() => {
        cy.visit('https://www.portfoliovisualizer.com/login');
        cy.get('#username').type('52480killer@gmail.com');
        cy.get('#password').type('12345678');
        cy.get('#submitButton').click();
        cy.visit('https://www.portfoliovisualizer.com/manage-fees');
        cy.get('#addFeeStructureButton').click();
        cy.url().should('include', 'edit-fees');
    });

    function fillTier(index, assets, percentage, amount) {
        if (assets !== undefined) cy.get(`#assets${index}`).clear().type(assets.toString());
        if (percentage !== undefined) cy.get(`#percentage${index}`).clear().type(percentage.toString());
        if (amount !== undefined) cy.get(`#amount${index}`).clear().type(amount.toString());
    }

    it('TC-MF01: Management Fee', () => {
        cy.get('#name').clear().type('Management Fee');
        cy.get('#type').select('2');
        cy.get('#percentage').clear().type('1.0');
        cy.get('#frequency').select('4');
        cy.get('#submitButton').click();
        cy.url().should('include', 'manage-fees');
        cy.contains('Management Fee').should('exist');
    });

    it('TC-MF02: Tiered Management', () => {
        cy.get('#name').clear().type('TIERED MANAGEMENT');
        cy.get('#type').select('3');
        cy.get('#successiveTiers').select('false');
        cy.get('#frequency').select('4');

        fillTier(1, 250000, 1.00);
        fillTier(2, 500000, 0.90);
        fillTier(3, 1000000, 0.75);

        cy.get('#submitButton').click();
        cy.url().should('include', 'manage-fees');
        cy.contains('TIERED MANAGEMENT').should('exist');
    });

    it('TC-MF03: Performance Fee', () => {
        cy.get('#name').clear().type('Performance Fee');
        cy.get('#type').select('5');
        cy.get('#percentage').clear().type('1.0');
        cy.get('#incentiveRate').clear().type('20.0');
        cy.get('#useHurdle').select('true');
        cy.get('#fixedHurdleRate').select('true');
        cy.get('#hurdleRate').clear({ force: true }).type('5.0', { force: true });
        cy.get('#hardHurdle').select('false');
        cy.get('#highwaterMark').select('true');
        cy.get('#frequency').select('4');

        cy.get('#submitButton').click();
        cy.url().should('include', 'manage-fees');
        cy.contains('Performance Fee').should('exist');
    });

    it('TC-MF04: Invalid Tiered Amount', () => {
        cy.get('#name').clear();
        cy.get('#type').select('4');
        cy.get('#frequency').select('4');

        fillTier(1, 500000);
        fillTier(2, 250000);

        cy.get('#submitButton').click();
        cy.contains('Name cannot be blank').should('exist');
        cy.contains('Tier #2 asset level is not greater than assets for tier #1').should('exist');
    });

    it('TC-MF05: Fixed Amount', () => {
        cy.get('#name').clear().type('Fixed AMT');
        cy.get('#type').select('1');
        cy.get('#amount').clear().type('2000');
        cy.get('#inflationAdjusted').select('false');
        cy.get('#annualChange').clear().type('2.5');
        cy.get('#frequency').select('4');

        cy.get('#submitButton').click();
        cy.url().should('include', 'manage-fees');
        cy.contains('Fixed AMT').should('exist');
    });

    it('TC-MF06: Tiered Percent Minimum', () => {
        cy.get('#name').clear().type('F');
        cy.get('#type').select('3');
        cy.get('#successiveTiers').select('true');
        cy.get('#frequency').select('3');

        fillTier(1, 1, 0.01);

        cy.get('#submitButton').click();
        cy.url().should('include', 'manage-fees');
        cy.contains('F').should('exist');
    });

    it('TC-MF07: Performance Fee Upper Bound', () => {
        const longName = 'RANDOM'.repeat(50);
        cy.get('#name').clear().type(longName);
        cy.get('#type').select('5');
        cy.get('#percentage').clear().type('101.0');
        cy.get('#incentiveRate').clear().type('101.0');
        cy.get('#useHurdle').select('true');
        cy.get('#fixedHurdleRate').select('true');
        cy.get('#hurdleRate').clear({ force: true }).type('101.0', { force: true });
        cy.get('#hardHurdle').select('true');
        cy.get('#highwaterMark').select('true');
        cy.get('#frequency').select('2');

        cy.get('#submitButton').click();
        cy.url().should('include', 'manage-fees');
        cy.contains('RANDOM').should('exist');

    });
});
