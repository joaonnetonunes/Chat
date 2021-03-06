var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//app.enable('trust proxy');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * cors
 */
//app.options('http://localhost:9000/*', cors());
/*var whitelist = ['http://localhost:9000/!*', 'http://localhost:9000/', 'http://localhost/', '*'];
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};*/
//app.use(cors(corsOptions));

/**
 * mongo database stuff
 */
app.set('mongo_host', '127.0.0.1');
app.set('mongo_port', 27017);
app.set('mongo_db', 'chat');
app.set('mongo_url', `mongodb://${app.get('mongo_host')}:${app.get('mongo_port')}/${app.get('mongo_db')}`);
mongoose.Promise = global.Promise;
mongoose.connect(app.get('mongo_url'), {
    useMongoClient: true
});

/*app.use((req, res, next) => {
    res.io = io;
    next();
});

var sockets = io.sockets;

sockets.on('connection', (socket) => {
    console.log('A new connection has been established.');

    socket.on('message channel', (data) => {
        socket.broadcast.in(socket.channel).emit('new message', {
            message: data.message,
            channel: data.channel,
            sentAt: data.sentAt
        });
    });

    socket.on('join channel', function (data) {
        socket.channel = data.channel;
        socket.join(socket.channel);

        socket.emit('joined channel', data)
    });
});*/

require('./websocket')(app, io);
require('./routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {
    app,
    server
};
