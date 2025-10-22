const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { name, email, password, studentId, department, year, phone, role, employeeId } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Name, email, and password are required' });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User with this email already exists' });

    // Check if student ID already exists (if provided)
    if (studentId) {
      const existingStudent = await User.findOne({ studentId });
      if (existingStudent) return res.status(400).json({ msg: 'Student ID already exists' });
    }

    // Check if employee ID already exists (if provided)
    if (employeeId) {
      const existingEmployee = await User.findOne({ studentId: employeeId }); // Using studentId field for employeeId
      if (existingEmployee) return res.status(400).json({ msg: 'Employee ID already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      password: hashed,
      studentId: studentId || employeeId, // Use studentId field for both student and employee IDs
      department,
      year,
      phone,
      role: role || 'student'
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        studentId: user.studentId,
        department: user.department,
        year: user.year,
        phone: user.phone,
        createdAt: user.createdAt
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ msg: 'Server error during registration' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ msg: 'Email and password are required' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        studentId: user.studentId,
        department: user.department,
        year: user.year,
        phone: user.phone,
        createdAt: user.createdAt
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server error during login' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, studentId, department, year, phone } = req.body;
    
    // Check if email is being changed and if it already exists
    if (email && email !== req.user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ msg: 'Email already exists' });
    }

    // Check if student ID is being changed and if it already exists
    if (studentId && studentId !== req.user.studentId) {
      const existingStudent = await User.findOne({ studentId });
      if (existingStudent) return res.status(400).json({ msg: 'Student ID already exists' });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (studentId !== undefined) updateData.studentId = studentId;
    if (department) updateData.department = department;
    if (year) updateData.year = year;
    if (phone) updateData.phone = phone;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.json(user);
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all faculty members
exports.getFaculty = async (req, res) => {
  try {
    const faculty = await User.find({ role: { $in: ['faculty', 'hod', 'dean'] } })
      .select('name email department phone isActive createdAt')
      .sort({ name: 1 });
    
    res.status(200).json(faculty);
  } catch (error) {
    console.error('Error fetching faculty:', error);
    res.status(500).json({ msg: 'Server error fetching faculty' });
  }
};
