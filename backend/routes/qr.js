const express = require('express');
const router = express.Router();
const { generateQR, scanQR, getActiveQRs, adminSetQRDefaults, adminSetGeofence } = require('../controllers/qrController');
const { protect, authorize } = require('../middleware/auth');

// Faculty can generate QR codes
router.post('/generate', protect, authorize('faculty', 'hod', 'dean'), generateQR);
// Students scan QR
router.post('/scan', protect, authorize('student'), scanQR);
// Faculty can view their active QRs
router.get('/active', protect, authorize('faculty', 'hod', 'dean'), getActiveQRs);

// Admin endpoints
router.put('/admin/config/qr-defaults', protect, authorize('hod', 'dean'), adminSetQRDefaults);
router.put('/admin/config/geofence', protect, authorize('hod', 'dean'), adminSetGeofence);

module.exports = router;
