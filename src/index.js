module.exports = (app) => {
    app.use('/', require('./routes/main'));
    app.use('/users', require('./routes/users'));
    app.use('/conversations', require('./routes/conversations'));
    app.use('/login', require('./routes/login'));
};
