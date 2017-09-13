var conversations = require('./../../model/conversations');

module.exports = (req, res) => {
    conversations
        .find({})
        .then((conversations) => {
            if (!conversations) {
                return res
                    .status(404)
                    .json({
                        status: false,
                        conversations
                    })
            }
            return res
                .status(200)
                .json({
                    status: true,
                    conversations
                })
        })
        .catch((error) => {
            return res
                .status(500)
                .json({
                    status: false,
                    error
                })
        });
};