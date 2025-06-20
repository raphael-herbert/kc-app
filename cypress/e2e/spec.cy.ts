describe('Region', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.get('input[type="text"]')
      .should('exist')
      .and('be.visible');
  });

  it('should display suggestions when typing a valid region', () => {
    cy.visit('/');

    cy.get('input[type="text"]').type('Normandie', { force: true });

    cy.get('mat-option')
      .should('exist')
      .and('have.length.at.least', 1)
      .first()
      .should('contain.text', 'Normandie');
  });

  it('should display "no data" when typing a non-existing region', () => {
    cy.visit('/');

    cy.get('input[type="text"]').type('ioejoizrjioez', { force: true });

    cy.get('mat-option')
      .should('exist')
      .and('contain.text', 'Aucune région trouvée.');
  });

  it('should display "error" when typing and backend returns error', () => {
    cy.intercept('GET', 'https://geo.api.gouv.fr/regions*', {
      statusCode: 500,
      body: {},
    }).as('regionSearchError');

    cy.visit('/');

    cy.get('input[type="text"]').type('Normandie', { force: true });

    cy.wait('@regionSearchError');

    cy.get('mat-option')
      .should('exist')
      .and('contain.text', 'Une erreur est survenue'); // ou ta vraie traduction
  });
})
