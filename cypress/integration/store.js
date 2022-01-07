describe('Local app loads succesfully', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000') // change URL to match your dev URL
  })
})

describe('Testing the creation of an Open incident in the Store', () => {
  it('successfuly creates an Open incident', () => {
    
    cy.get('input[id="firstdate"]').clear()
    cy.get('input[id="seconddate"]').clear()
    cy.get('input[id="firstDateQuery"]').clear()
    cy.get('input[id="secondDateQuery"]').clear()
    cy.get('input[id="description"]').clear()

    cy.get('input[id="description"]').type('Clean the floor')
    cy.get('input[id="firstdate"]').type("2021-12-30")
    cy.get('input[id="seconddate"]').type("2022-04-01")
    cy.get('button[id="createIncident"]').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Incident created succesfully`)
    })

    cy.get('input[id="firstDateQuery"]').type("2021-08-30")
    cy.get('input[id="secondDateQuery"]').type("2022-03-01")
    cy.get('button[id="checkStatus"]').click()
    cy.get('#numberOfOpenCases').contains("Number of open cases is 1")
    }) 

  })

  describe('Testing the creation of a Closed incident in the Store', () => {
    it('successfuly creates a Closed incident', () => {
      
      cy.get('input[id="firstdate"]').clear()
      cy.get('input[id="seconddate"]').clear()
      cy.get('input[id="firstDateQuery"]').clear()
      cy.get('input[id="secondDateQuery"]').clear()
      cy.get('input[id="description"]').clear()
      
      cy.get('input[id="description"]').type('Change the coffee powder')
      cy.get('input[id="firstdate"]').type("2021-12-30")
      cy.get('input[id="seconddate"]').type("2022-01-20")
      cy.get('button[id="createIncident"]').click()
      cy.on('window:alert', (str) => {
        expect(str).to.equal(`Incident created succesfully`)
      })
  
      cy.get('input[id="firstDateQuery"]').type("2021-08-30")
      cy.get('input[id="secondDateQuery"]').type("2022-03-01")
      cy.get('button[id="checkStatus"]').click()
      cy.get('#numberOfClosedCases').contains("Number of closed cases is 1")
      
      // Since there is only one closed case, both AverageTime and MaximumTime to close will be the same value.
      cy.get('#averageSolutionTime').contains(
        (
        ((new Date("2022-01-20").getTime()) - (new Date("2021-12-30").getTime())).toString()  
        ))
      }) 
    })

    describe('Testing the creation of a second Closed incident in the Store', () => {
      it('successfuly creates a Closed incident', () => {
        
        cy.get('input[id="firstdate"]').clear()
        cy.get('input[id="seconddate"]').clear()
        cy.get('input[id="firstDateQuery"]').clear()
        cy.get('input[id="secondDateQuery"]').clear()
        cy.get('input[id="description"]').clear()
        
        cy.get('input[id="description"]').type('Clean the bathrooms')
        cy.get('input[id="firstdate"]').type("2021-04-30")
        cy.get('input[id="seconddate"]').type("2022-01-20")
        cy.get('button[id="createIncident"]').click()
        cy.on('window:alert', (str) => {
          expect(str).to.equal(`Incident created succesfully`)
        })
    
        //Now there are two closed cases and one open case.
        //So the average completion time is going to be the average between these two, and the maximum
        //time the maximum time to complete between both of them.
        
        cy.get('input[id="firstDateQuery"]').type("2021-01-30")
        cy.get('input[id="secondDateQuery"]').type("2022-03-01")
        cy.get('button[id="checkStatus"]').click()
        cy.get('#numberOfClosedCases').contains("Number of closed cases is 2")
        
        //Checking maximum time is correct
        cy.get('#maximumSolutionTime').contains(
          (
           (new Date("2022-01-20").getTime() - new Date("2021-04-30"))
          )
        )
        }) 
      })

  


describe('Testing invalid dates so Incident is not created', () => {
  it('triggers alert for invalid input values', () => {
    cy.get('input[id="firstdate"]').clear()
    cy.get('input[id="seconddate"]').clear()
    cy.get('input[id="description"]').type('Clean the floor')
    cy.get('button[id="createIncident"]').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Both start and end date must be valid values`)
    })
  })
})


