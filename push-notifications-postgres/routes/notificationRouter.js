const Joi = require('joi');
const notificationServices = require('../services/notificationServices');

const notificationRoutes = [
    {
        method: 'POST',
        path: '/notification',
        handler: async (request, h) => {
            const { id, page, limit } = request.payload;
            try {
                const notifications = await notificationServices.getAllNotifications(id, page, limit);
                return h.response(notifications).code(200);
            } catch (error) {
                console.error('Error getting notifications:', error);
                return h.response({ message: 'Internal Server Error' }).code(500);
            }
        },
        options: {
            validate: {
                payload: Joi.object({
                    id: Joi.number().integer().required(),
                    page: Joi.number().integer().required(),
                    limit: Joi.number().integer().required()
                })
            }
        }
    },
    {
        method: 'DELETE',
        path: '/',
        handler: async (request, h) => {
            const { id } = request.payload;
            try {
                const notification = await notificationServices.deleteNotification(id);
                return h.response(notification).code(200);
            } catch (error) {
                console.error('Error deleting notification:', error);
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
    },
    {
        method: 'PATCH',
        path: '/',
        handler: async (request, h) => {
            const { id } = request.payload;
            try {
                const notification = await notificationServices.markOneNotificationasread(id);
                return h.response(notification).code(200);
            } catch (error) {
                console.error('Error marking one notification as read:', error);
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
    },
    {
        method: 'DELETE',
        path: '/all',
        handler: async (request, h) => {
            const { id } = request.payload;
            try {
                const notifications = await notificationServices.deleteAllNotifications(id);
                return h.response(notifications).code(200);
            } catch (error) {
                console.error('Error deleting all notifications:', error);
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
    },
    {
        method: 'PATCH',
        path: '/all',
        handler: async (request, h) => {
            const { id } = request.payload;
            try {
                const notifications = await notificationServices.markAllNotificationsAsRead(id);
                return h.response(notifications).code(200);
            } catch (error) {
                console.error('Error marking all notifications as read:', error);
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

module.exports = notificationRoutes;