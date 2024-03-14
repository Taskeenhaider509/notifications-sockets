const Joi = require('joi');
const {} = require('../services/userServices');

const userRoutes = [
    {
        method: 'GET',
        path: '/users/{id}',
        handler: async (request, h) => {
            const id = parseInt(request.params.id)
            try {
                const user = await userServices(id);
                return h.response(user).code(200);
            } catch (error) {
                console.error('Error getting user:', error);
                return h.response({ message: 'Internal Server Error' }).code(500);
            }
        },
        options: {
            validate: {
                payload: Joi.object({
                    id: Joi.number().integer().required()
                })
            }
        }
    }
];

module.exports = userRoutes;