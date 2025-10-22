const express = require('express');
const router = express.Router();
const { registerFace, getFaceStatus, updateSecuritySettings } = require('../controllers/faceController');
const { protect } = require('../middleware/auth');

router.post('/register', protect, registerFace);
router.get('/status', protect, getFaceStatus);
router.put('/security-settings', protect, updateSecuritySettings);

module.exports = router;
