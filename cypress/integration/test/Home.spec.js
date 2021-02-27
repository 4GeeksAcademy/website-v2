context('Home Page', () => {
    it('The path Home must be "/"', () => {
      cy.visit('localhost:8000/').wait(5000)

      cy.location().should((location) => {
        expect(location.pathname).to.eq('/')
      })
    })

    it('Shoud open and close the "CHOOSE PROGRAM" section', () => {

        cy.get('button').contains('CHOOSE PROGRAM').click()
    })

    it('Should Scroll "Testimonials" to the Right', () => {
        cy.get('#DragScroll-Testimonials').wait(3000)
        cy.get('#DragScroll-Testimonials').scrollTo('right', { duration: 2000 })
    })
    
    it('Should Scroll "OurPartners" to the Right, then to the center', () => {
        cy.get('#DragScroll-Partners').wait(3000)
        cy.get('#DragScroll-Partners').scrollTo('right', { duration: 2000 })
        cy.get('#DragScroll-Partners').scrollTo('center', { duration: 1000 })
      })
  })