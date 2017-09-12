const users = require('./../../schemas/users');
const mongoose = require('mongoose');

module.exports = (req, res) => {
    let searchObject = {};

    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        searchObject = {
            $or: [
                { _id: req.params.id },
                { username: req.params.id }
            ]
        }
    } else {
        searchObject = {
            username: req.params.id
        }
    }
    users
        .findOne(searchObject)
        .then((user) => {
            if (!user) {
                return res.sendStatus(404);
            }

            return res.render('users/show', {
                title: `${user.name} - Chat Admin`,
                panelTitle: 'User Details',
                user,
                pageGroupUsers: true,
                userLogged: req.user
            });
        })
        .catch((error) => {
            return res.send('Error: ' + error);
        })
};