// RegisterController.js
const bcrypt = require('bcrypt');
const connection = require('../config/db');

function registerUser(req, res) {
  const { username, email, password } = req.body;

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password: ' + err);
      res.status(500).send('Error hashing password');
      return;
    }

    // Insert user into database
    connection.query('INSERT INTO login (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (error, results, fields) => {
      if (error) {
        console.error('Error registering user: ' + error);
        res.status(500).send('Error registering user');
        return;
      }
      console.log('User registered successfully');
      res.status(200).send('User registered successfully');
    });
  });
}

module.exports = {
  registerUser
};
