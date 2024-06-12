const db = require('../config/db');

const addOrUpdateCompanyDetails = async (req, res) => {
  const { cmp_city, cmp_type, cmp_name, first_name, last_name, email, password } = req.body;

  if (!cmp_city || cmp_type === undefined || !cmp_name || !first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the email already exists
    db.query('SELECT * FROM company_details WHERE email = ?', [email], (error, results) => {
      if (error) {
        console.error('Error checking email existence: ' + error.message);
        return res.status(500).json({ message: 'Error checking email existence' });
      }

      if (results.length > 0) {
        // Email exists, update the existing record
        db.query('UPDATE company_details SET cmp_city = ?, cmp_type = ?, cmp_name = ?, first_name = ?, last_name = ?, password = ? WHERE email = ?', 
          [cmp_city, cmp_type, cmp_name, first_name, last_name, password, email], (error, results) => {
            if (error) {
              console.error('Error updating company details: ' + error.message);
              return res.status(500).json({ message: 'Error updating company details' });
            }
            res.status(200).json({ message: 'Company details updated successfully' });
          });
      } else {
        // Email does not exist, insert a new record
        db.query('INSERT INTO company_details (cmp_city, cmp_type, cmp_name, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [cmp_city, cmp_type, cmp_name, first_name, last_name, email, password], (error, results) => {
            if (error) {
              console.error('Error adding company details: ' + error.message);
              return res.status(500).json({ message: 'Error adding company details' });
            }
            res.status(201).json({ id: results.insertId, message: 'New company details added successfully' });
          });
      }
    });
  } catch (error) {
    console.error('Unexpected error: ' + error.message);
    return res.status(500).json({ message: 'Unexpected error occurred' });
  }
};

module.exports = addOrUpdateCompanyDetails;
