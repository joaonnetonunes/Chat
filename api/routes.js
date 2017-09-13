var cors = require('cors');

module.exports = (app) => {
    var whitelist = ['http://localhost:9000/'];
    var corsOptionsDelegate = function (req, callback) {
        var corsOptions;
        if (whitelist.indexOf(req.header('Origin')) !== -1) {
            corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
        }else{
            corsOptions = { origin: false } // disable CORS for this request
        }
        callback(null, corsOptions) // callback expects two parameters: error and options
    };
    /*var corsOptions = {
        origin: 'http://localhost:9000',
        methods: 'GET'
    };*/

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.use('/users', cors(corsOptionsDelegate), require('./routes/users'));
    app.use('/conversations', cors(corsOptionsDelegate), require('./routes/conversations'));
};