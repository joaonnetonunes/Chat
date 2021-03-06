module.exports = (req, res, next) => {
    req
        .checkBody('name', 'Field name is required')
        .notEmpty();
    req
        .checkBody('username', 'Field username is required')
        .notEmpty();
    req
        .checkBody('email', 'Field email is required')
        .notEmpty()
        .isEmail();
    req
        .checkBody('password', 'Field password is required')
        .notEmpty();

    req.getValidationResult().then((result) => {
        if (!result.isEmpty()) {
            return res.redirect('/users/new');
        } else {
            return next();
        }
    });
};