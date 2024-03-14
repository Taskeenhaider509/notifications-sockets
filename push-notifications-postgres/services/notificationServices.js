const pool = require('../db/config');
const {
    filtredNotificationsQuery,
    totalQuery,
    deleteOneQuery,
    deleteAllQuery,
    updateOneQuery,
    updateAllQuery } = require('../queries/notificationQuery')

const getAllNotifications = async (id, page, limit) => {
    const client = await pool.connect();
    try {

        const filtredNotificationsResult = await client.query(filtredNotificationsQuery, [id, limit, limit * page]);
        const totalResult = await client.query(totalQuery, [id]);
        const total = totalResult.rows[0].count;

        return { totalpage: Math.ceil(total / limit), notifications: filtredNotificationsResult.rows };
    } catch (error) {
        console.error('Error getting notifications:', error);
        throw error;
    } finally {
        client.release();
    }
};

const deleteNotification = async (id) => {
    const client = await pool.connect();
    try {
        const result = await client.query(deleteOneQuery, [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting notification:', error);
        throw error;
    } finally {
        client.release();
    }
};

const deleteAllNotifications = async (id) => {
    const client = await pool.connect();
    try {
        const result = await client.query(deleteAllQuery, [id]);
        return result.rows;
    } catch (error) {
        console.error('Error deleting all notifications:', error);
        throw error;
    } finally {
        client.release();
    }
};

const markOneNotificationasread = async (id) => {
    const client = await pool.connect();
    try {
        const result = await client.query(updateOneQuery, [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error marking one notification as read:', error);
        throw error;
    } finally {
        client.release();
    }
};

const markAllNotificationsAsRead = async (id) => {
    const client = await pool.connect();
    try {
        const result = await client.query(updateAllQuery, [id]);
        return result.rows;
    } catch (error) {
        console.error('Error marking all notifications as read:', error);
        throw error;
    } finally {
        client.release();
    }
};

module.exports = {
    getAllNotifications,
    deleteNotification,
    deleteAllNotifications,
    markOneNotificationasread,
    markAllNotificationsAsRead,
};
