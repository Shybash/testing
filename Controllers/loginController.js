const mysql = require('mysql2/promise'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  try {
    const [rows, fields] = await db.promise().query('SELECT * FROM login WHERE email = ?', [email]); 
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
module.exports = { loginUser };
