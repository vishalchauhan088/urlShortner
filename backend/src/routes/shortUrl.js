import express from 'express';
import {
    validateUrl,
    createUrl,
    urlClick,
    checkReqid
} from '../controllers/urlHandler.js'
const router = express.Router();

router.post('/', validateUrl,  createUrl);
router.get('/:id', checkReqid,urlClick);

export default router;