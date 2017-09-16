const cuid = require("cuid");

class ChatSocket {

    constructor(io) {
        this.io = io;
        this.users = [];
        this.afterLogHandler = [];
        this.bind();
    }

    afterLog(handler) {
        this.afterLogHandler.push(handler);
    }

    callAfterLog() {
        this.afterLogHandler.map((handler) => {
            handler();
        });
    }

    sendServerMessage(message) {
        this.io.emit('new_message', message);
    }

    bind() {
        this.io.on('connection', this.handleConnection.bind(this));
    }

    handleMessageSent(socket, message) {

        let user = this.users.find((a) => {
            return a.socket === socket;
        });
        socket.broadcast.emit('new_message', Object.assign(
            {},
            message,
            {user: user.id, type: 'text'}
        ));
        console.log(user.id + ": wrote " + message.content);
        this.callAfterLog();
    }

    handleTypingPing(socket){
        socket.broadcast.emit('ping_typing');
    }

    handleConnection(socket) {
        const userId = cuid();
        this.users.push({
            id: userId,
            socket
        });
        socket.emit('id_assigned', userId);
        socket.on('send_message', this.handleMessageSent.bind(this, socket));
        socket.on('ping_typing', this.handleTypingPing.bind(this, socket));
        console.log(userId + ': connected');
        this.callAfterLog();

    }
}

module.exports = ChatSocket;