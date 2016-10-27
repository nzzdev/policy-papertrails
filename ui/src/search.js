const affairGroups = {
  "Wahlen": "1",
  "Geschäft des Bundesrates": "1",
  "Geschäft des Parlaments": "1",
  "Parlamentarische Initiative": "1",
  "Motion": "1",
  "Postulat": "2",
  "Dringliche Interpellation": "2",
  "Interpellation": "2",
  "Anfrage": "3",
  "Dringliche Anfrage": "3",
  "Dringliche Einfache Anfrage": "3",
  "Einfache Anfrage": "3",
  "Standesinitiative": "3",
  "Für die Galerie": "3",
  "Fragestunde. Frage": "3",
  "Petition": "3"
}

export class Search {

  attached() {
    this.query = 'Nachrichtendienst';
    this.search();
  }
  
  search() {
    fetch(`https://policy-papertrails-api.eu-gb.mybluemix.net/affairs?q=${this.query}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        return data.hits.hits;
      })
      .then(hits => {
        return hits
          .sort((a, b) => {
            return (Date.parse(a._source.deposit.date) - Date.parse(b._source.deposit.date))
          })
      })
      .then(hits => {
        return hits
          .map(hit => {
            if (affairGroups.hasOwnProperty(hit._source.affairType.name)) {
              hit._source.group = affairGroups[hit._source.affairType.name]
            } else {
              hit._source.group = 1;
            }
            return hit;
          })
      })
      .then(hits => {
        this.hits = hits;
        let hitsByYear = {};
        hits
          .map(hit => {
            let depositDate = new Date(hit._source.deposit.date)
            if (!hitsByYear.hasOwnProperty(depositDate.getFullYear())) {
              hitsByYear[depositDate.getFullYear()] = []
            }
            hitsByYear[depositDate.getFullYear()].push(hit)
          })
        this.yearsSpanned = Object.keys(hitsByYear)
        this.hitsByYear = hitsByYear;
      })
  }
}
