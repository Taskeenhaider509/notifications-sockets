const Hapi = require('@hapi/hapi');
const { Server } = require('http');
const socketioHandler = require('./sockets/socketio');
const userRoutes = require('./routes/userRouter');
const authRoutes = require('./routes/authRouter');
const notificationRoutes = require('./routes/notificationRouter');
const pool = require('./db/config');

const init = async () => {
    // Create HTTP server
    const server = new Server();

    const io = require('socket.io')(server, {
        transports: ['polling']
    });
    socketioHandler(io);

    const hapiServer = Hapi.server({
        port: 3500,
        host: 'localhost',
        listener: server // Pass the HTTP server to Hapi.js
    });

    // Connect to PostgreSQL pool
    await pool.connect();

    // Define API routes
    hapiServer.route(userRoutes);
    hapiServer.route(authRoutes);
    hapiServer.route(notificationRoutes);

    await hapiServer.start();
    console.log('Server running on %s', hapiServer.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();