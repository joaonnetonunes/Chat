const conversations = require('./../../schemas/conversations');

module.exports = (req, res) => {
    let conversation = new conversations();

    return res.render('conversations/create', {
        title: 'Conversations - Chat Admin',
        panelTitle: 'New Chat',
        conversation,
        pageNewConversation: true,
        pageGroupConversations: true,
        pageUsesFormConversation: true,
        pageUsesICheck: true,
        userLogged: req.user
    });
};