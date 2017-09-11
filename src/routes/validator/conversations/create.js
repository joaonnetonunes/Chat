module.exports = (req, res, next) => {
    req
        .checkBody('name', 'Field is required')
        .notEmpty();
    req.checkBody('enable', 'Field enable is required')
        .notEmpty();

    let errors = req.validationErrors();

    if (!errors) {
        return next();
    }

    return res.redirect('/conversations/new');
};