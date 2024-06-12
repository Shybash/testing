const connection = require('../config/db');

function insertAccountInformation(req, res) {
  const accountInfo = req.body;
  const { mobilenumber, streetAddress_1, streetAddress_2, city, province, country, postalcode } = accountInfo;

  // Check if any required field is missing or null
  if (!mobilenumber || !streetAddress_1 || !city || !country || !postalcode) {
    console.error('Error inserting account information: Missing or null required fields');
    console.log('Account Info:', accountInfo); // Print the accountInfo object for debugging
    res.status(400).json({ error: 'Missing or null required fields' });
    return; // Exit the function to prevent further execution
  }

  // Construct the SQL query
  const sql = 'INSERT INTO account_information (mobilenumber, streetAddress_1, streetAddress_2, city, province, country, postalcode) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [mobilenumber, streetAddress_1, streetAddress_2 || null, city, province || null, country, postalcode];

  // Execute the SQL query
  connection.query(sql, values, (error, results, fields) => {
    if (error) {
      console.error('Error inserting account information:', error);
      res.status(500).json({ error: 'Error inserting account information' });
      return; // Handle the error more gracefully
    }
    console.log('Account information inserted successfully');
    res.status(201).json({ message: 'Account information inserted successfully' });
  });
}

module.exports = {
  insertAccountInformation
};
