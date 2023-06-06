const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/auth.middleware');
const auth = require('../controllers/auth.controller');
const imageUploadMiddleware = require('../utils/imageUpload');

router.post('/register', imageUploadMiddleware, auth.register);
router.post('/login', auth.login);
router.get('/user', authMiddleware, auth.getUser);
router.delete('/logout', authMiddleware, auth.logout);

module.exports = router;
