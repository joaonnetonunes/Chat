const conversations = require('./../../schemas/conversations');

module.exports = (req, res) => {
    req.body.slug = req.body.name.toLowerCase().replace(/ /g, '-');
    req.body.enable = !!req.body.enable;

    conversations
        .findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            return res.redirect('/conversations');
        })
        .catch((error) => {
            return res.send('Error: ' + error);
        })
};