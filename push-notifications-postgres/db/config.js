const { Pool } = require('pg');
require('dotenv').config();
const {queryUserTable, queryNotifyTable} = require("../queries/tableQuery");

const pool = new Pool({
    user: process.env.USER_NAME,
    host: process.env.USER_HOST,
    database: process.env.USER_DATABASE,
    password: process.env.USER_PASSWORD,
    port: process.env.USER_PORT,
});

const createTables = async () => {
    try {
        // Create users table
        await pool.query(queryUserTable);

        // Create notifications table
        await pool.query(queryNotifyTable);

        console.log('Tables created successfully');
    } catch (error) {
        console.error('Error creating tables:', error);
    }
};

createTables();

module.exports = pool;