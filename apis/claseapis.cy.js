it('Debe encontrar Mortys vivos', () => {

  cy.request('GET', 'https://rickandmortyapi.com/api/character?name=morty&status=alive')
    .then((response) => {

      expect(response.status).to.eq(200)
      expect(response.body.info.count).to.eq(34)  // hay 34 Mortys vivos

      // Verificamos que todos los resultados cumplan el filtro
      response.body.results.forEach(personaje => {
        expect(personaje.name.toLowerCase()).to.include('morty')
        expect(personaje.status).to.eq('Alive')
      })

    })
})