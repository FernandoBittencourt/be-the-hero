const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const SessionController = require('./controller/SessionController');
const NgoController = require('./controller/NgoController');
const IncidentController = require('./controller/IncidentController');
const ProfileController = require('./controller/ProfileController');

const routes = express.Router();

routes.post('/session', SessionController.create);

routes.get('/ngo', NgoController.index);
routes.post('/ngo', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(1000000000).max(9999999999999),
        city: Joi.string().required(),
        state: Joi.string().required().length(2)
    })
}), NgoController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), ProfileController.index);

routes.get('/incident', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}),IncidentController.index);
routes.post('/incident', IncidentController.create);
routes.delete('/incident/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}),IncidentController.delete);

module.exports = routes;