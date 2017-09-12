const users = require('./../../schemas/users');

module.exports = (req, res) => {
    users
        .authenticate()(req.body.email, req.body.password, (err, user, options) => {
            if (err) {
                return res.send('Error: ' + err);
            }

            return req.login(user, (err) => {
                if (err) {
                    return res.redirect('/login')
                }

                return res.redirect('/');
            })
        })
};