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
        console.log(this.yearsSpanned, hitsByYear)
        this.hitsByYear = hitsByYear;
      })
  }
}
