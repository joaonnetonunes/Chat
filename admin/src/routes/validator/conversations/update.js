module.exports = (req, res, next) => {
    req
        .checkParams('id', 'Field id is required')
        .notEmpty()
        .isMongoId();

    req.getValidationResult().then((result) => {
        if (!result.isEmpty()) {
            return res.redirect('/conversations');
        } else {
            return next();
        }
    });
};