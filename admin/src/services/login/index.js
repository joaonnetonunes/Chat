module.exports = (req, res) => {
    return res.render('login/index', {
        title: 'Login - APPChat Admin',
        pageUsesICheck: true,
        pageUsesFormLogin: true
    });
};