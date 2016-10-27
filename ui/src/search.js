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
    this.init();
    this.query = 'Burka';
    this.search();
  }

  init() {
    this.hits = []
    this.hitsByYear = {}
    this.yearsSpanned = []
  }

  executeSuggestedQuery(query) {
    this.query = query;
    this.search();
  }
  
  search() {
    this.init();
    fetch(`https://policy-papertrails-api.eu-gb.mybluemix.net/affairs?q=${this.query}`)
      .then(response => {
        if (!response.ok) {
          throw response;
        }
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
            let year = parseInt(depositDate.getFullYear())
            if (!hitsByYear.hasOwnProperty(year)) {
              hitsByYear[year] = []
            }
            hitsByYear[year].push(hit)
          })

        let firstYear = parseInt(Object.keys(hitsByYear).shift())
        let lastYear = parseInt(Object.keys(hitsByYear).pop())

        let currentYear = firstYear;
        while (currentYear <= lastYear) {
          this.yearsSpanned.push(currentYear);
          currentYear++;
        }

        this.hitsByYear = hitsByYear;
      })
      .catch(err => {
        console.log(err)
        this.init();
      })
  }
}
