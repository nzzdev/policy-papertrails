'use strict';

const Boom = require('boom');
const Hapi = require('hapi');
const Joi = require('joi');
const corsHeaders = require('hapi-cors-headers')
const Pack = require('./package.json');

const routes = require('./routes/routes.js');

var hapiOptions = {};
var yaralCache;


const server = new Hapi.Server(hapiOptions);

server.connection({
  port: process.env.PORT || 3000
});

var plugins = [
  require('hapi-heroku-helpers'),
  require('inert'),
];


server.register(plugins, function(err) {
  if (err) {
      console.error('Failed to load plugins:', err);
  }

  server.route(routes);

  server.ext('onPreResponse', corsHeaders);

  server.start(function () {
      console.log('Server running at:', server.info.uri);
  });


});
