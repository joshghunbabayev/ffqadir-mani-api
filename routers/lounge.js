import { Router } from 'express';
const router = new Router();

import {
    getWoltData,
    createWoltData,
    deleteWoltData,
    getCafeData,
    createCafeData,
    deleteCafeData
} from '../controllers/lounge.js';

import {
    AdminAuthenticateForApi
} from '../middlewares/auth.js';

router.route('/wolt')
    .get(getWoltData)
    .post(AdminAuthenticateForApi, createWoltData);

router.route('/wolt/:id')
    .delete(AdminAuthenticateForApi, deleteWoltData);

router.route('/cafe')
    .get(getCafeData)
    .post(AdminAuthenticateForApi, createCafeData);

router.route('/cafe/:id')
    .delete(AdminAuthenticateForApi, deleteCafeData);

export default router;