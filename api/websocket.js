module.exports = (app, io) => {
    var userAgent;
    var requestIp = require('request-ip');
    var ipaddr = require('ipaddr.js');

    app.use((req, res, next) => {
        userAgent = req.headers['user-agent'];

        var clientIp = requestIp.getClientIp(req);
        var addr = ipaddr.parse(clientIp);

        console.log(addr.kind() + ': ' + clientIp);
        console.log(addr.toIPv4Address().toString());

        if (addr.isIPv4MappedAddress()) {
            //console.log('ipv4: ' + addr.toIPv4Address().toString() + addr.toIPv4MappedAddress());
        }

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
            console.log('User-Agent: ' + userAgent);

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
    });
};
