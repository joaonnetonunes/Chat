module.exports = (req, res, next) => {
    req
        .checkParams('slug', 'Field id is required')
        .notEmpty();

    req.getValidationResult().then((result) => {
        if (!result.isEmpty()) {
            return res.redirect('/conversations');
        } else {
            return next();
        }
    });
};