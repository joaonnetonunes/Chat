const conversations = require('./../../schemas/conversations');

module.exports = (req, res) => {
    conversations
        .find()
        .then((conversations) => {
            return res.render('conversations/index', {
                title: 'Conversations - Chat Admin',
                panelTitle: 'View Conversations',
                conversations,
                pageUsesFooTable: true,
                pageUsesSweetAlert: true,
                pageViewConversations: true,
                pageGroupConversations: true,
                userLogged: req.user
            });
        })
        .catch((error) => {
            return res.send('Error: ' + error);
        })
};