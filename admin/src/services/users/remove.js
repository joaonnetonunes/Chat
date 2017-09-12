const users = require('./../../schemas/users');

module.exports = (req, res) => {

    users
        .findByIdAndRemove(req.params.id)
        .then((user) => {
            if (!user) {
                return res.sendStatus(404);
            }

            return res.redirect('/users');
        })
        .catch((error) => {
            return res.send('Error: ' + error);
        })
};