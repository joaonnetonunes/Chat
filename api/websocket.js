module.exports = (app, io) => {
    app.use((req, res, next) => {
        res.io = io;
        next();
    });

    var sockets = io.sockets;

    sockets.on('connection', (socket) => {
        console.log('A new connection has been established.');

        /**
         * channels
         */
        socket.on('message channel', (data) => {
            socket.broadcast.in(socket.channel).emit('new message', {
                message: data.message,
                channel: data.channel,
                sentAt: data.sentAt
            });
        });

        socket.on('message user', (data) => {
            @TODO: 
            socket.broadcast.in(socket.username).emit('new message', {
                message: data.message,
                username: data.username,
                sentAt: data.sentAt
            });
        });

        socket.on('join user', (data) => {
            socket.username = data.username;
            socket.join(socket.username);

            socket.emit('joined user', data);
        });

        socket.on('join channel', function (data) {
            socket.channel = data.channel;
            socket.join(socket.channel);

            socket.emit('joined channel', data);
        });

        /**
         * direct messages
         */


    });
};
