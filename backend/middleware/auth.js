const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token || !token.startsWith('Bearer ')) return res.status(401).json({ msg: 'Not authorized' });

  token = token.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch {
    res.status(401).json({ msg: 'Token invalid' });
  }
};
