const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/auth.middleware');
const ad = require('../controllers/ads.controller');
const imageUploadMiddleware = require('../utils/imageUpload');

router.get('/ads', ad.getAll);
router.get('/ads/:id', ad.getOne);
router.post('/ads', authMiddleware, imageUploadMiddleware, ad.postNew);
router.put('/ads/:id', authMiddleware, imageUploadMiddleware, ad.update);
router.delete('/ads/:id', authMiddleware, ad.delete);
router.get('/ads/search/:searchPhrase', ad.searchByPhrase);

module.exports = router;
