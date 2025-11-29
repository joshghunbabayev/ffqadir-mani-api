import jwt from 'jsonwebtoken';

async function AdminAuthenticateForApi(req, res, next) {
    const { token } = req.cookies;

    if (!token) {
        return res.status(400).json({});
    };

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
        return res.status(400).json({});
    };

    if (decoded.id !== process.env.ADMIN_ID || decoded.key !== process.env.ADMIN_KEY) {
        return res.status(400).json({});
    }

    next();
};

async function AdminAuthenticateForPage(req, res, next) {
    const { token } = req.cookies;

    if (!token) {
        return res.redirect('/ff-main/admin/login');
    };

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
        return res.redirect('/ff-main/admin/login');
    };

    if (decoded.id !== process.env.ADMIN_ID || decoded.key !== process.env.ADMIN_KEY) {
        return res.redirect('/ff-main/admin/login');
    }

    next();
};

export {
    AdminAuthenticateForApi,
    AdminAuthenticateForPage,
};