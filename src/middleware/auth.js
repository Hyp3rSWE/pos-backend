const isAdminAuthenticated = (req, res, next) => {
    if (req.session.userRole === 'admin') {
        return next();
    }
    return res.status(403).json({ error: 'Admin access required' });
};

const isCashierAuthenticated = (req, res, next) => {
    if (req.session.userRole === 'cashier') {
        return next();
    }
    return res.status(403).json({ error: 'Cashier access required' });
};

module.exports = { isAdminAuthenticated, isCashierAuthenticated };
