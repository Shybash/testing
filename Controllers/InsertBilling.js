const connection = require('../config/db');

function insertBillingInformation(req, res) {
  const accountInfo = req.body;
  console.log('Received account information:', accountInfo); // Log the received account information

  const { first_name, last_name, streetAddress_1, streetAddress_2, city, region, country, postalcode } = accountInfo;

  // Check if any required field is missing or null
  if (!first_name || !last_name || !streetAddress_1 || !streetAddress_2 || !city || !region || !country || !postalcode) {
    console.error('Error inserting account information: Missing or null required fields');
    console.log('Account Info:', accountInfo); // Print the accountInfo object for debugging
    return res.status(400).json({ error: 'Missing or null required fields' }); // Return the response directly and exit the function
  }
  const sql = 'INSERT INTO billing_information (first_name, last_name, streetAddress_1, streetAddress_2, city, region, country, postalcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [first_name, last_name, streetAddress_1, streetAddress_2 !== undefined ? streetAddress_2 : null, city, region !== undefined ? region : null, country, postalcode];
  
  // Execute the SQL query
  connection.query(sql, values, (error, results, fields) => {
    if (error) {
      console.error('Error inserting account information:', error);
      return res.status(500).json({ error: 'Error inserting account information' }); // Return the response directly and exit the function
    }
    console.log('Account information inserted successfully');
    res.status(201).json({ message: 'Account information inserted successfully' });
  });
}

module.exports = {
    insertBillingInformation
};
