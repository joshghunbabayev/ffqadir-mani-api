import { Router } from 'express';
import rateLimit from 'express-rate-limit';
const router = new Router();

import {
    getAdminPage,
    getAdminLoginPage,
    loginAdmin
} from '../controllers/admin.js';

import {
    AdminAuthenticateForPage
} from '../middlewares/auth.js';

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5
});

router.route('/')
    .get(AdminAuthenticateForPage, getAdminPage)

router.route('/login')
    .get(getAdminLoginPage)
    .post(loginLimiter, loginAdmin)

export default router;