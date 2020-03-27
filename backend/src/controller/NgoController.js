const connection = require('../database/connection');
const generateUniqueId = require('../util/generateUniqueId');

module.exports = {
    async index(request, response) {
        const ngos = await connection('ngo').select('*');
        return response.json(ngos);
    },

    async create(request, response){
        const { name, email, whatsapp, city, state } = request.body;

        const id = generateUniqueId();

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