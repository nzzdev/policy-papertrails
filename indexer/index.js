const client = require('./client.js')
const getAllAffairs = require('./helpers.js').getAllAffairs
const getAffairDetail = require('./helpers.js').getAffairDetail

getAllAffairs()
  .then(affairs => {
    console.log('numberOfAffairs', affairs.length)
    for (let affairId of affairs) {
      getAffairDetail(affairId)
        .then(affair => {
          client.index({
            index: 'parlch',
            type: 'affair',
            id: affairId,
            body: affair
          }, function (error, response) {
            if (error) {
              console.log(error)
            } else {
              console.log(response)
            }
          })
        })
    }
  })

