const users = require('./../../schemas/users');

module.exports = (req, res) => {

    users
        .findById(req.params.id)
        .then((user) => {
            if (!user) {
                return res.sendStatus(404);
            }

            return res.render('users/edit', {
                title: 'Edit User - Chat Admin',
                panelTitle: 'Edit User',
                user,
                pageGroupUsers: true,
                userLogged: req.user
            });
        })
        .catch((error) => {
            return res.send('Error: ' + error);
        })
};