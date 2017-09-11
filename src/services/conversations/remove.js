const conversations = require('./../../schemas/conversations');

module.exports = (req, res) => {
    conversations
        .findByIdAndRemove(req.params.id)
        .then((conversation) => {
            if (!conversation) {
                return res.sendStatus(404);
            }

            return res.redirect('/conversations');
        })
        .catch((error) => {
            return res.send('Error: ' + error);
        })
};