const User = require('../models/User');
const Attendance = require('../models/Attendance');

exports.adminListUsers = async (req, res) => {
  try {
    const { role, q } = req.query;
    const filter = {};
    if (role) filter.role = role;
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { studentId: { $regex: q, $options: 'i' } }
      ];
    }
    const users = await User.find(filter).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (e) {
    res.status(500).json({ msg: 'Error listing users' });
  }
};

exports.adminToggleUserActive = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;
    if (typeof isActive !== 'boolean') {
      return res.status(400).json({ msg: 'isActive must be boolean' });
    }
    const user = await User.findByIdAndUpdate(id, { isActive }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (e) {
    res.status(500).json({ msg: 'Error updating user' });
  }
};

exports.adminGetAnalytics = async (req, res) => {
  try {
    const { period = '30' } = req.query;
    const days = parseInt(period, 10) || 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const overall = await Attendance.aggregate([
      { $match: { date: { $gte: startDate } } },
      {
        $group: {
          _id: null,
          totalRecords: { $sum: 1 },
          present: { $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] } },
          absent: { $sum: { $cond: [{ $eq: ['$status', 'absent'] }, 1, 0] } }
        }
      }
    ]);

    const byDay = await Attendance.aggregate([
      { $match: { date: { $gte: startDate } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          present: { $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] } },
          absent: { $sum: { $cond: [{ $eq: ['$status', 'absent'] }, 1, 0] } }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const byDepartment = await Attendance.aggregate([
      { $match: { date: { $gte: startDate } } },
      { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' },
      {
        $group: {
          _id: '$user.department',
          present: { $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] } },
          absent: { $sum: { $cond: [{ $eq: ['$status', 'absent'] }, 1, 0] } }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      overall: overall[0] || { totalRecords: 0, present: 0, absent: 0 },
      byDay,
      byDepartment
    });
  } catch (e) {
    res.status(500).json({ msg: 'Error computing analytics' });
  }
};
