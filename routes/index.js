const routes = require('express').Router();
const names = require('../controllers/names');

routes.get('/', names.dylanRoute);
routes.use('/derek', names.derekRoute)

module.exports = routes