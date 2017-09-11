module.exports = (req, res) => {
    return res.render('main/index', {
        title: 'Chat - Admin',
        panelTitle: 'Dashboard',
        pageDashboard: true,
        userLogged: req.user
    });
};
