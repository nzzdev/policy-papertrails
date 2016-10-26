// const VCAP_SERVICES = require('./vcap.js')

const VCAP_SERVICES = JSON.parse(process.env.VCAP_SERVICES);

var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: VCAP_SERVICES['compose-for-elasticsearch'][0].credentials.uri,
});

client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: Infinity,

  // undocumented params are appended to the query string
  hello: "elasticsearch!"
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

module.exports = client;
