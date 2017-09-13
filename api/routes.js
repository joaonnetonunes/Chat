module.exports = (app) => {
    app.use('/users', require('./routes/users'));
    app.use('/conversations', require('./routes/conversations'));
};