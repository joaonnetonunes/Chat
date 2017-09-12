const conversations = require('./../../schemas/conversations');

module.exports = (req, res) => {
    req.body.slug = req.body.name.toLowerCase().replace(/ /g, '-');
    req.body.enable = !!req.body.enable;

    conversations
        .create(req.body)
        .then((conversations) => {
            return res.redirect('/conversations')
        })
        .catch((error) => {
            return res.send('Error: ' + error);
        })
};