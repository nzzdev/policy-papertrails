const client = require('./client.js')
const getAllAffairs = require('./helpers.js').getAllAffairs
const getAffairDetail = require('./helpers.js').getAffairDetail

const config = require('./config.js')

getAllAffairs(config.minPageNr, config.maxPageNr)
  .then(affairs => {
    console.log('numberOfAffairs', affairs.length)
    for (let affairId of affairs) {
      setTimeout(() => {
        console.log('loading affair detail ', affairId)
        getAffairDetail(affairId)
          .then(affair => {
            console.log('loaded affair ', affairId)
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
      }, 700);
    }
  })

