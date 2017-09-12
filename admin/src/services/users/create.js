const users = require('./../../schemas/users');

module.exports = (req, res) => {
    req.body.slug = req.body.name.toLowerCase().replace(/ /g, '-');

    users
        .register(req.body, req.body.password, (error, account) => {
            if (error) {
                return res.send('Error: ' + error);
            }

            return res.redirect('/users');
        })
};