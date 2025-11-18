module.exports = function (req, res, next) {
    if (!req.session || !req.session.user) {
        req.session.pendingOrder = req.body; 
        return res.redirect('/login');
    }
    next();
};
