const conversations = require('./../../schemas/conversations');

module.exports = (req, res) => {
    conversations
        .findOne({
            slug: req.params.slug
        })
        .then((conversation) => {
            if (!conversation) {
                return res.sendStatus(404);
            }

            return res.render('conversations/edit', {
                title: 'Edit Conversation - Chat Admin',
                panelTitle: 'Edit Conversation',
                conversation,
                pageEditConversation: true,
                pageGroupConversations: true,
                pageUsesFormConversation: true,
                pageUsesICheck: true,
                userLogged: req.user
            });
        })
        .catch((error) => {
            return res.send('Error: ' + error);
        })
};