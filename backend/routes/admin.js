const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { adminSetQRDefaults, adminSetGeofence } = require('../controllers/qrController');
const { adminListUsers, adminToggleUserActive, adminGetAnalytics } = require('../controllers/adminController');

// Config endpoints
router.put('/config/qr-defaults', protect, authorize('hod', 'dean'), adminSetQRDefaults);
router.put('/config/geofence', protect, authorize('hod', 'dean'), adminSetGeofence);

// User management
router.get('/users', protect, authorize('hod', 'dean'), adminListUsers);
router.put('/users/:id/active', protect, authorize('hod', 'dean'), adminToggleUserActive);

// Analytics
router.get('/analytics', protect, authorize('hod', 'dean'), adminGetAnalytics);

module.exports = router;
