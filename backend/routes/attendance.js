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
const { protect, authorize } = require('../middleware/auth');

// Student routes
router.post('/check-in', protect, authorize('student'), checkIn);
router.post('/check-out', protect, authorize('student'), checkOut);
router.get('/me', protect, authorize('student'), getAttendance);
router.get('/summary', protect, authorize('student'), getSummary);
router.get('/analytics', protect, authorize('student'), getAnalytics);

// Faculty routes
router.get('/students', protect, authorize('faculty', 'hod', 'dean'), getStudents);
router.get('/faculty-overview', protect, authorize('faculty', 'hod', 'dean'), getFacultyOverview);
router.get('/faculty-date/:date', protect, authorize('faculty', 'hod', 'dean'), getAttendanceForDate);
router.get('/faculty-analytics', protect, authorize('faculty', 'hod', 'dean'), getFacultyAnalytics);

module.exports = router;