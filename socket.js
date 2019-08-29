const SocketIO = require('socket.io');
const http = require('http');
require('dotenv').config();

const Logger = require('./src/logger')('[SOCKET]');

const server = require('./server');

/** Configuração do Socket IO */
var socket = http.createServer(server).listen(process.env.SOCKET_PORT, () => {
    Logger.print(`✔ Socket running at port ${process.env.SOCKET_PORT}`);
});
var io = SocketIO.listen(socket);

module.exports = io;