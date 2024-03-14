const filtredNotificationsQuery = 'SELECT * FROM notifications WHERE user_id = $1 LIMIT $2 OFFSET $3';
const totalQuery = 'SELECT COUNT(*) FROM notifications WHERE user_id = $1';
const deleteOneQuery = 'DELETE FROM notifications WHERE id = $1 RETURNING *';
const deleteAllQuery = 'DELETE FROM notifications WHERE user_id = $1 RETURNING *';
const updateOneQuery = 'UPDATE notifications SET read = false WHERE id = $1 RETURNING *';
const updateAllQuery = 'UPDATE notifications SET read = true WHERE user_id = $1 RETURNING *';

module.exports = {
    filtredNotificationsQuery,
    totalQuery,
    deleteOneQuery,
    deleteAllQuery,
    updateOneQuery,
    updateAllQuery
}