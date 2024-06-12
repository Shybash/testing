const connection = require('../config/db');

function insertBusinessInformation(req, res) {
    const businessInfo = req.body;
    const { streetAddress_1, streetAddress_2, city, province, country, postalcode, industry } = businessInfo;
  
    // Check if any required field is missing or null
    if (!streetAddress_1 || !city || !country || !postalcode || !industry) {
      console.error('Error inserting business information: Missing or null required fields');
      console.log('Business Info:', businessInfo); // Print the businessInfo object for debugging
      res.status(400).json({ error: 'Missing or null required fields' });
      return; // Exit the function to prevent further execution
    }
  
    // Construct the SQL query
    const sql = 'INSERT INTO business_information (streetAddress_1, streetAddress_2, city, province, country, postalcode, industry) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [streetAddress_1, streetAddress_2 || null, city, province || null, country, postalcode, industry];
  
    // Execute the SQL query
    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        console.error('Error inserting business information:', error);
        res.status(500).json({ error: 'Error inserting business information' });
        return; // Handle the error more gracefully
      }
      console.log('Business information inserted successfully');
      res.status(201).json({ message: 'Business information inserted successfully' });
    });
  }
  
  module.exports = {
    insertBusinessInformation
  };
