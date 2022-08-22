const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        // http server
        this.server = http.createServer(this.app);
        // configuraciones de socket
        this.io = socketio(this.server);
    }
    middelwares() {
        this.app.use(express.static(path.resolve(__dirname, '../public')));
        this.app.use(cors());
    }
    socketConfig() {
        new Sockets(this.io)
        
    }
    execute() {
        //inicializa middlewares
        this.middelwares();
        // Inicializar sockets
        this.socketConfig();
        //inicializa el server
        this.server.listen(this.port, () => {
            console.log('server on port: 3000');
        })
    }
}
module.exports = Server;