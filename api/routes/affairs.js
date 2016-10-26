const Joi = require('joi')
const client = require('../elastic-client.js')

module.exports = [
  {
    method: 'GET',
    path: '/affairs',
    config: {
      handler: function(request, reply) {
        client.search({
          index: 'parlch',
          q: `_all:${request.query.q}`,
        })
        .then(data => {
          reply(data)
        })
        .catch(err => {
          console.log(err)
          reply(err)
        })
      }
    }
  }
]
