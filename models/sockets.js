var BandList = require('./band-list');
class Sockets {

    constructor (io) {
        this.io = io;
        this.bandList = new BandList();
        this.socketsEvents();
    }
    socketsEvents() {
        // ON connection
        this.io.on('connection', ( socket ) => {
            console.log('cliente conectado',  socket.id);
            // EVENTO ESCUCHA mensaje-to-server
            socket.emit('current-bands', this.bandList.getBands());

            socket.on('vote-band', (id) => {
                this.bandList.increaseVotes(id);
                this.io.emit('current-bands', this.bandList.getBands());
            });

            socket.on('delete-band', (id) => {
                this.bandList.removeBand(id);
                this.io.emit('current-bands', this.bandList.getBands());
            });

            socket.on('change-name', ({id, name}) => {
                console.log({id, name})
                this.bandList.changeBanName(id, name);
                this.io.emit('current-bands', this.bandList.getBands());
            });

            socket.on('create-band', ({name}) => {
                console.log({name})
                this.bandList.addBand(name);
                this.io.emit('current-bands', this.bandList.getBands());
            })
        });
    }
}
module.exports = Sockets;