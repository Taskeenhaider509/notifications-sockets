const queryGetOneUser = 'SELECT * FROM users WHERE id = $1';
const queryUserActive = 'SELECT * FROM users WHERE username = $1 AND active = true';
const queryInsertNotify = 'INSERT INTO notifications (user_id, title, type, text, read) VALUES ($1, $2, $3, $4, $5)';
const QueryInsertUser = `INSERT INTO users (username, password, email, active) VALUES ($1, $2, $3, $4) RETURNING *`;

module.exports = {
    queryGetOneUser,   
    queryUserActive,
    queryInsertNotify,
    QueryInsertUser
}