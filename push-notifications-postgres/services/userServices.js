const Joi = require('joi');
const pool = require('../db/config');
const { queryGetOneUser, QueryInsertUser } = require('../queries/userQuery')

const insertUsers = async (id, username, password, email, active) => {
    const client = await pool.connect();
    try {

        const userCreated = await client.query(QueryInsertUser, [id, username, password, email, active]);
        return userCreated.rows[0];

    } catch (error) {
        console.error('Error creating users:', error);
        throw error;
    } finally {
        client.release();
    }
};


const getOneUser = async (req, h) => {
    const { id } = req.payload; // Assuming payload contains the data

    // Validate request
    const schema = Joi.object({
        id: Joi.string().required().trim().max(255) // Adjust validation as needed
    });

    const { error } = schema.validate({ id });
    if (error) {
        return h.response({ message: error.details[0].message }).code(400);
    }

    const client = await pool.connect();
    try {
        const result = await client.query(queryGetOneUser, [id]);

        if (result.rows.length === 0) {
            return h.response({ message: `Can't find a user with this id: ${id}` }).code(400);
        }

        return h.response(result.rows[0]);
    } catch (error) {
        console.error('Error while fetching user:', error);
        return h.response({ message: 'Internal Server Error' }).code(500);
    } finally {
        client.release();
    }
};

module.exports = {
    getOneUser,
    insertUsers
};