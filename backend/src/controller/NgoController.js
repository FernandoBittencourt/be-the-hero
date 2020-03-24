const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(request, response) {
        const ngos = await connection('ngo').select('*');
        return response.json(ngos);
    },

    async create(request, response){
        const { name, email, whatsapp, city, state } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ngo').insert({ 
            id, 
            name, 
            email, 
            whatsapp, 
            city, 
            state,
        })

        return response.json({ id });
    }
}