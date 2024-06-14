const Router = require('express').Router();

const Notes = require('./notes-route');

Router.use(Notes);
//api routes

module.exports = Router;