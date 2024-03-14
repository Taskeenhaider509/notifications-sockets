const userServices = require('../services/userServices');
const notificationServices = require('../services/notificationServices');

let usersio = [];

module.exports = function (io) {
  io.on('connection', async (socket) => {
    socket.on('setUserId', async (userId) => {
      if (userId) {
        try {
          const oneUser = await userServices.getOneUser(userId);
          if (oneUser) {
            usersio[userId] = socket;
            console.log(`Socket: User with id ${userId} connected`);
          } else {
            console.log(`Socket: No user with id ${userId}`);
          }
        } catch (error) {
          console.error(`Error fetching user with id ${userId}:`, error);
        }
      }
    });

    socket.on('getNotificationsLength', async (userId) => {
      try {
        const notifications = await notificationServices.getAllNotifications(userId);
        usersio[userId]?.emit('notificationsLength', notifications.length || 0);
      } catch (error) {
        console.error(`Error fetching notifications for user with id ${userId}:`, error);
      }
    });

    socket.on('disconnect', (userId) => {
      console.log(`User with id ${userId} disconnected from socket`);
      usersio[userId] = null;
    });
  });
};
