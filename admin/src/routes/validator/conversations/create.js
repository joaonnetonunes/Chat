module.exports = (req, res, next) => {
    req
        .checkBody('name', 'Field is required')
        .notEmpty();
    req.checkBody('enable', 'Field enable is required')
        .notEmpty();

    req.getValidationResult().then((result) => {
        if (!result.isEmpty()) {
            return res.redirect('/conversations/new');
        } else {
            return next();
        }
    });
};