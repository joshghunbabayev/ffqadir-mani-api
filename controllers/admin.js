import jwt from 'jsonwebtoken';

function getAdminPage(req, res) {
    res.status(200).render('admin');
};

function getAdminLoginPage(req, res) {
    res.status(200).render('admin_login');
};

function loginAdmin(req, res) {
    const { username, password1, password2 } = req.body;

    if (!username || !password1 || !password2) {
        let message = '';

        if (!username) {
            message += 'Username ';
        };

        if (!password1) {
            message += 'Password 1 ';
        };

        if (!password2) {
            message += 'Password 2 ';
        };

        res.status(400).json({ message: message + 'are required.' });
        return;
    };

    if (username !== process.env.ADMIN_USERNAME || password1 !== process.env.ADMIN_PASSWORD_1 || password2 !== process.env.ADMIN_PASSWORD_2) {
        res.status(401).json({ message: 'Invalid username or password.' });
        return;
    };

    const token = jwt.sign({
        id: process.env.ADMIN_ID,
        key: process.env.ADMIN_KEY
    },
        process.env.SECRET_KEY, { expiresIn: '1d' });

    res.cookie('token', token, {
        httpOnly: true,
    });

    res.status(200).json({});
};

export {
    getAdminPage,
    getAdminLoginPage,
    loginAdmin
};