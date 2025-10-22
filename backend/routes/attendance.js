const express = require('express');
const router = express.Router();
const { 
  checkIn, 
  checkOut, 
  getAttendance, 
  getSummary, 
  getAnalytics,
  getStudents,
  getFacultyOverview,
  getAttendanceForDate,
  getFacultyAnalytics
} = require('../controllers/attendanceController');
const { protect } = require('../middleware/auth');

// Student routes
router.post('/check-in', protect, checkIn);
router.post('/check-out', protect, checkOut);
router.get('/me', protect, getAttendance);
router.get('/summary', protect, getSummary);
router.get('/analytics', protect, getAnalytics);

// Faculty routes
router.get('/students', protect, getStudents);
router.get('/faculty-overview', protect, getFacultyOverview);
router.get('/faculty-date/:date', protect, getAttendanceForDate);
router.get('/faculty-analytics', protect, getFacultyAnalytics);

module.exports = router;