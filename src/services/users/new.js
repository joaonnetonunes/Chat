const users = require('./../../schemas/users');

module.exports = (req, res) => {
    let user = new users();

    return res.render('users/create', {
        title: 'Users - Chat Admin',
        panelTitle: 'New User',
        user,
        pageNewUser: true,
        pageGroupUsers: true,
        userLogged: req.user
    });
};