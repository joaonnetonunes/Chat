const users = require('./../../schemas/users');

module.exports = (req, res) => {
    users
        .find()
        .then((users) => {
            return res.render('users/index', {
                title: 'Users - Chat Admin',
                panelTitle: 'View Users',
                users,
                pageViewUsers: true,
                pageGroupUsers: true,
                pageUsesFooTable: true,
                pageUsesSweetAlert: true,
                userLogged: req.user
            });
        })
        .catch((error) => {
            return res.send('Error: ' + error);
        })
};