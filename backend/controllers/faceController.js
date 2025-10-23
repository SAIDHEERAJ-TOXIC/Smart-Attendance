const User = require('../models/User');
const FaceVerificationService = require('../services/faceVerificationService');

// Register face data for a student
exports.registerFace = async (req, res) => {
  try {
    const { faceImage } = req.body;
    
    if (!faceImage) {
      return res.status(400).json({ msg: 'Face image is required' });
    }

    const student = await User.findById(req.user._id);
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    // Generate face encoding
    const faceEncoding = FaceVerificationService.generateFaceEncoding(faceImage);
    
    // Update student with face data
    student.faceData = {
      encoding: faceEncoding,
      registeredAt: new Date(),
      lastVerified: null,
      verificationCount: 0
    };
    
    await student.save();

    res.json({
      success: true,
      message: 'Face data registered successfully',
      registeredAt: student.faceData.registeredAt
    });

  } catch (error) {
    console.error('Face registration error:', error);
    res.status(500).json({ msg: 'Error registering face data' });
  }
};

// Get face registration status
exports.getFaceStatus = async (req, res) => {
  try {
    const student = await User.findById(req.user._id);
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    res.json({
      hasRegisteredFace: !!student.faceData?.encoding,
      registeredAt: student.faceData?.registeredAt,
      lastVerified: student.faceData?.lastVerified,
      verificationCount: student.faceData?.verificationCount || 0,
      securitySettings: student.securitySettings
    });

  } catch (error) {
    console.error('Get face status error:', error);
    res.status(500).json({ msg: 'Error getting face status' });
  }
};

// Update security settings
exports.updateSecuritySettings = async (req, res) => {
  try {
    const { requireFaceVerification, allowProxyAttendance, maxVerificationAttempts } = req.body;
    
    const student = await User.findById(req.user._id);
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    // Update security settings
    if (requireFaceVerification !== undefined) {
      student.securitySettings.requireFaceVerification = requireFaceVerification;
    }
    if (allowProxyAttendance !== undefined) {
      student.securitySettings.allowProxyAttendance = allowProxyAttendance;
    }
    if (maxVerificationAttempts !== undefined) {
      student.securitySettings.maxVerificationAttempts = maxVerificationAttempts;
    }

    await student.save();

    res.json({
      success: true,
      message: 'Security settings updated successfully',
      securitySettings: student.securitySettings
    });

  } catch (error) {
    console.error('Update security settings error:', error);
    res.status(500).json({ msg: 'Error updating security settings' });
  }
};

// Admin: Upsert face data for a student by user id param
exports.adminUpsertFaceForStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { faceImage, encoding } = req.body;

    if (!faceImage && !encoding) {
      return res.status(400).json({ msg: 'Provide faceImage or encoding' });
    }

    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    const faceEncoding = encoding || FaceVerificationService.generateFaceEncoding(faceImage);
    student.faceData = {
      encoding: faceEncoding,
      registeredAt: new Date(),
      lastVerified: null,
      verificationCount: 0
    };
    await student.save();

    res.json({ success: true, message: 'Face data upserted', userId: student._id });
  } catch (error) {
    console.error('Admin upsert face error:', error);
    res.status(500).json({ msg: 'Error updating face data' });
  }
};

// Admin: Delete face data for a student by user id param
exports.adminDeleteFaceForStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    student.faceData = undefined;
    await student.save();

    res.json({ success: true, message: 'Face data deleted', userId: student._id });
  } catch (error) {
    console.error('Admin delete face error:', error);
    res.status(500).json({ msg: 'Error deleting face data' });
  }
};
