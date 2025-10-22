const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'faculty', 'hod', 'dean'], default: 'student' },
  studentId: { type: String, unique: true, sparse: true },
  department: String,
  year: String,
  phone: String,
  isActive: { type: Boolean, default: true },
  // Face verification data
  faceData: {
    encoding: String, // Base64 encoded face encoding
    registeredAt: Date,
    lastVerified: Date,
    verificationCount: { type: Number, default: 0 }
  },
  // Security settings
  securitySettings: {
    requireFaceVerification: { type: Boolean, default: true },
    allowProxyAttendance: { type: Boolean, default: false },
    maxVerificationAttempts: { type: Number, default: 3 }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
