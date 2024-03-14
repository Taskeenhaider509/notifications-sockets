const Joi = require('joi');
const login = require('../services/authServices');

const authRoutes = [
    {
        method: 'POST',
        path: '/auth/user',
        handler: async (request, h) => {
            const { email, password } = request.payload;
            const user = await login(email, password);
            return h.response(user).code(201);
        },
        options: {
            validate: {
                payload: Joi.object({
                    email: Joi.string().required(),
                    password: Joi.string().required()
                })
            }
        }
    }
];

module.exports = authRoutes;