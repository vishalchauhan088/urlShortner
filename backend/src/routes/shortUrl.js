import express from 'express';
import {
    validateUrl,
    searchUrl,
    createUrl,
    urlClick,
    checkReqid
} from '../controllers/urlHandler.js'
const router = express.Router();

router.post('/', validateUrl, searchUrl, createUrl);
router.get('/:id', checkReqid,urlClick);

export default router;