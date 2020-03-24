const express = require('express');
const SessionController = require('./controller/SessionController');
const NgoController = require('./controller/NgoController');
const IncidentController = require('./controller/IncidentController');
const ProfileController = require('./controller/ProfileController');

const routes = express.Router();

routes.post('/session', SessionController.create);

routes.get('/ngo', NgoController.index);
routes.post('/ngo', NgoController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incident', IncidentController.index);
routes.post('/incident', IncidentController.create);
routes.delete('/incident/:id', IncidentController.delete);

module.exports = routes;