const users = require('./../../schemas/users');

module.exports = (req, res) => {
    users
        .findById(req.params.id)
        .then((user) => {
            user.password = req.body.password;

            user.setPassword(user.password, (err, updated, passErr) => {
                if (err || passErr) {
                    return res.send('Error: ' + error)
                }

                user.save();

                user.email = req.body.email;
                user.name = req.body.name;
                user.username = req.body.username;

                user.save();
                return res.redirect('/users')

            })
        })
        .catch((error) => {
            return res.send('Error: ' + error)
        })
};