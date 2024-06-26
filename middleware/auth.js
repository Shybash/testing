const jwt = require('jsonwebtoken');
const db = require('../config/db');

const authenticateUser = async (req, res, next) => {
  try {
    const tokenCookie = req.headers.cookie;
    console.log(tokenCookie);
    if (!tokenCookie) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    const token = tokenCookie.split(';')
      .map(cookie => cookie.trim())
      .find(cookie => cookie.startsWith('token='))
      .split('=')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);
    const userId = decoded.userId;

    req.user = {
      id: userId,
      email: decoded.email
    };
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
module.exports = authenticateUser;
