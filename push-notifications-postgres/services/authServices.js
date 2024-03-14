const pool = require('../db/config');
const { queryUserActive, queryInsertNotify } = require('../queries/userQuery')

const login = async (req, h) => {
    const { username, password } = req.payload; // Assuming payload contains the data

    if (!username || !password) {
        return h.response({ message: 'All fields are required' }).code(400);
    }

    const client = await pool.connect();
    try {
        // Check if the user exists and is active
        const result = await client.query(queryUserActive, [username]);

        if (result.rows.length === 0) {
            return h.response({ message: 'Unauthorized' }).code(401);
        }

        // Assuming you have the appropriate columns in your PostgreSQL user table
        const foundUser = result.rows[0];

        // You can respond with the user data if needed
        res.json({ foundUser });

        // Add notification for login
        await client.query(queryInsertNotify, [foundUser.id, 'login', 1, `New login at ${new Date()}`, false]);

        return h.response({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        return h.response({ message: 'Internal Server Error' }).code(500);
    } finally {
        client.release();
    }
};

module.exports = {
    login,
};