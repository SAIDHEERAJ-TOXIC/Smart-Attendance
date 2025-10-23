const express = require('express');
const router = express.Router();
const { registerFace, getFaceStatus, updateSecuritySettings, adminUpsertFaceForStudent, adminDeleteFaceForStudent } = require('../controllers/faceController');
const { protect, authorize } = require('../middleware/auth');

router.post('/register', protect, registerFace);
router.get('/status', protect, getFaceStatus);
router.put('/security-settings', protect, updateSecuritySettings);

// Admin face management
router.put('/admin/:studentId', protect, authorize('hod', 'dean'), adminUpsertFaceForStudent);
router.delete('/admin/:studentId', protect, authorize('hod', 'dean'), adminDeleteFaceForStudent);

module.exports = router;
