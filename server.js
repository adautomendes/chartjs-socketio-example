const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const routes = require('./routes');
const DB = require('./src/database/config');
const Logger = require('./src/logger')('[SERVER]');

const server = express();

server.use(express.json());
server.use(express.static(__dirname + "/public/"));



/****************************************/
// const SocketIO = require('socket.io');
// const http = require('http');

// var socket = http.createServer(server).listen(process.env.SOCKET_PORT, () => {
//     Logger.print(`✔ Socket running at port ${process.env.SOCKET_PORT}`);
// });
// var io = SocketIO.listen(socket);

// server.use((req, res, next) => {
//     const { x, y } = req.body;

//     if (x && y) {
//         io.emit('graphUpdate', { x, y });
//     }

//     next();
// });

// const io = require('./socket');
// server.use((req, res, next) => {
//     const { x, y } = req.body;

//     if (x && y) {
//         io.emit('graphUpdate', { x, y });
//     }

//     next();
// });
/****************************************/



server.use(routes);

mongoose.connect(DB.DB_URL, DB.DB_SETTINGS, (err) => {
    if (!err) {
        Logger.print(`✔ Connected to MongoDB`);
    } else {
        Logger.print(`✖ Error while connecting to MongoDB.\n${err}`);
    }
});

server.listen(process.env.PORT, () => {
    Logger.print(`✔ Server running at port ${process.env.PORT}`);
});

module.exports = server;