import { Router } from 'express';
const router = new Router();

import {
    getPubgData,
    createPubgData,
    deletePubgData,
    getTiktokData,
    createTiktokData,
    deleteTiktokData,
    getFanData,
    createFanData,
    deleteFanData,
} from '../controllers/game.js';

import {
    AdminAuthenticateForApi
} from '../middlewares/auth.js';

router.route('/pubg')
    .get(getPubgData)
    .post(AdminAuthenticateForApi, createPubgData)

router.route('/pubg/:id')
    .delete(AdminAuthenticateForApi, deletePubgData)

router.route('/tiktok')
    .get(getTiktokData)
    .post(AdminAuthenticateForApi, createTiktokData)

router.route('/tiktok/:id')
    .delete(AdminAuthenticateForApi, deleteTiktokData)

router.route('/fan')
    .get(getFanData)
    .post(AdminAuthenticateForApi, createFanData)

router.route('/fan/:id')
    .delete(AdminAuthenticateForApi, deleteFanData)

export default router;