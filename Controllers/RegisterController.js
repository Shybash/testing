const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../config/db');

function registerUser(req, res) {
  const {
    firstName,
    lastName,
    email,
    password,
    subscribe,
    businessType,
    province,
    businessStructure,
    companyName,
    companyType
  } = req.body;

  if (!firstName || !lastName || !email || !password || subscribe === undefined) {
    return res.status(400).send('All fields are required');
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password: ' + err);
      return res.status(500).send('Error hashing password');
    }

    connection.query(
      'INSERT INTO login (firstname, lastname, email, password, subscribe, businessType, province, businessStructure, companyName, companyType) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
      [firstName, lastName, email, hashedPassword, subscribe, businessType, province, businessStructure, companyName, companyType], 
      (error, results, fields) => {
        if (error) {
          console.error('Error registering user: ' + error);
          return res.status(500).send('Error registering user');
        }

        const userId = results.insertId;

        const token = jwt.sign(
          { userId: userId, email: email },
          process.env.JWT_SECRET, 
          { expiresIn: '1h' }
        );

        res.cookie('token', token, { httpOnly: false, secure: process.env.NODE_ENV === 'production' });

        console.log('User registered successfully');
        return res.status(200).json({ message: 'User registered successfully', userId: userId });
      }
    );
  });
}

module.exports = {
  registerUser
};
