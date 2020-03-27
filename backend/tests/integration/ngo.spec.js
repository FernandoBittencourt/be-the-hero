const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('NGO', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new NGO', async () => {
        const response = await request(app)
            .post('/ngo')
            .send({
                name: "TEST",
                email: "test@test.com",
                whatsapp: "5521993679448",
                city: "Rio de Janeiro",
                state: "RJ"
            });
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});