const url = 'https://www.portfoliovisualizer.com/manage-reports';

describe('Manage Reports Configuration', () => {
    beforeEach(() => {
        cy.visit('https://www.portfoliovisualizer.com/login');
        cy.get('#username').type('52480killer@gmail.com');
        cy.get('#password').type('12345678');
        cy.get('#rememberLogin').check();
        cy.get('#submitButton').click();
        cy.visit(url);
    });

    it('TC-MR01: Default configuration with custom colors', () => {
        cy.get('#companyName').clear().type('Portfolio Visualizer');
        cy.get('#includeLogo').select('Yes');
        cy.get('#companyLinkText').clear().type('www.portfoliovisualizer.com');
        cy.get('#companyLinkURL').clear().type('https://www.portfoliovisualizer.com');
        cy.get('#useCoverPage').select('No');
        cy.get('#includePageNumbers').select('Yes');
        cy.get('#includeReportDate').select('Yes');
        cy.get('#disclosuresType').select('Replace default disclosures');
        cy.get('#disclosures').clear();
        cy.get('#fontName').select('Roboto');
        cy.get('#chartPalette').select('Palette 1');
        cy.get('#reportTitleBackground').invoke('val','#00649E');
        cy.get('#reportTitleForeground').invoke('val','#FFFFFFF');
        cy.get('#sectionTitleBackground').invoke('val','#DBDBD8');
        cy.get('#sectionTitleForeground').invoke('val','#000000');
        cy.get('#tableHeaderBackground').invoke('val','#4477AA');
        cy.get('#tableHeaderForeground').invoke('val','#FFFFFFF');
        cy.get('#notesBackground').invoke('val','#ECECEC');
        cy.get('#submitReportsButton').click();
        cy.contains('Changes saved successfully').should('be.visible');
    });

    it('TC-MR02: Custom configuration with file uploads', () => {
        cy.get('#companyName').clear().type('my investment firm');
        cy.get('#includeLogo').select('Yes');
        cy.get('#logoImage').selectFile('cypress/fixtures/companylogo.png');
        cy.get('#companyLinkText').clear().type('www.portfoliovisualizer.com');
        cy.get('#companyLinkURL').clear().type('https://www.portfoliovisualizer.com');
        cy.get('#useCoverPage').select('Yes');
        cy.get('#coverPage').selectFile('cypress/fixtures/file.pdf');
        cy.get('#includePageNumbers').select('Yes');
        cy.get('#includeReportDate').select('Yes');
        cy.get('#disclosuresType').select('Display above default disclosures');
        cy.get('#disclosures').clear().type('This report is for informational purposes.');
        cy.get('#fontName').select('Lato');
        cy.get('#chartPalette').select('Custom');
        cy.get('#chartColorList').clear().type('#FF0000 #00FF00 #0000FF #ECECEC');
        cy.get('#reportTitleBackground').invoke('val','#00649E');
        cy.get('#reportTitleForeground').invoke('val','#FFFFFF');
        cy.get('#sectionTitleBackground').invoke('val','#DBDBDB');
        cy.get('#sectionTitleForeground').invoke('val','#000000');
        cy.get('#tableHeaderBackground').invoke('val','#4477AA');
        cy.get('#tableHeaderForeground').invoke('val','#FFFFFF');
        cy.get('#notesBackground').invoke('val','#ECECEC');
        cy.get('#submitReportsButton').click();
        cy.contains('Changes saved successfully').should('be.visible');
    });

    it('TC-MR03: Invalid color codes and URL', () => {
        cy.get('#companyName').clear();
        cy.get('#includeLogo').select('Yes');
        cy.get('#logoImage').selectFile('cypress/fixtures/Capture.PNG');
        cy.get('#companyLinkText').clear().type('www.portfoliovisualizer.com');
        cy.get('#companyLinkURL').clear().type('WRONGURL');
        cy.get('#useCoverPage').select('No');
        cy.get('#includePageNumbers').select('No');
        cy.get('#includeReportDate').select('No');
        cy.get('#disclosuresType').select('Display below default disclosures');
        cy.get('#disclosures').clear().type('This report is for informational purposes.');
        cy.get('#fontName').select('Montserrat');
        cy.get('#chartPalette').select('Custom');
        cy.get('#chartColorList').clear().type('#ZZ #00FF00 #*&^%$#@ #FFFF2,');
        cy.get('#reportTitleBackground').invoke('val','#FF0000');
        cy.get('#reportTitleForeground').invoke('val','#FFFFFF');
        cy.get('#sectionTitleBackground').invoke('val','#D8DBDB');
        cy.get('#sectionTitleForeground').invoke('val','#000000');
        cy.get('#tableHeaderBackground').invoke('val','#4477AA');
        cy.get('#tableHeaderForeground').invoke('val','#FFFFFF');
        cy.get('#notesBackground').invoke('val','#ECECEC');
        cy.get('#submitReportsButton').click();
        cy.contains('Invalid color code #ZZ in the chart color palette list').should('be.visible');
    });

    it('TC-MR04: Max length validation errors', () => {
        cy.get('#companyName').clear().type('LONGGG'.repeat(50));
        cy.get('#includeLogo').select('No');
        cy.get('#companyLinkText').clear();
        cy.get('#companyLinkURL').clear();
        cy.get('#useCoverPage').select('No');
        cy.get('#includePageNumbers').select('No');
        cy.get('#includeReportDate').select('No');
        cy.get('#disclosuresType').select('Replace default disclosures');
        cy.get('#disclosures').invoke('val', 'X'.repeat(543438));
        cy.get('#fontName').select('Montserrat');
        cy.get('#chartPalette').select('Custom');
        cy.get('#chartColorList').clear().type('#FF0000 #FFFFFF #D8D8D8 '.repeat(100));
        cy.get('#reportTitleBackground').invoke('val','#FF0000');
        cy.get('#reportTitleForeground').invoke('val','#FFFFFF');
        cy.get('#sectionTitleBackground').invoke('val','#D8DBDB');
        cy.get('#sectionTitleForeground').invoke('val','#000000');
        cy.get('#tableHeaderBackground').invoke('val','#4477AA');
        cy.get('#tableHeaderForeground').invoke('val','#FFFFFF');
        cy.get('#notesBackground').invoke('val','#ECECEC');
        cy.get('#submitReportsButton').click();
        cy.contains('The request parameter "disclosures" was too long. Max length allowed is 524,288, but found 543,438!').should('be.visible');
    });
});