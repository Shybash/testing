const connection = require('../config/db');

function insertBillingInformation(req, res) {
  const accountInfo = req.body;
  const { id } = req.user;
  const userId = id;
  
  const { firstname, lastname, streetAddress1, streetAddress2, city, Region, country, zipcode } = accountInfo;
  
  // Check if all required fields are present
  if (!firstname || !lastname || !streetAddress1 || !city || !Region || !country || !zipcode) {
    console.error('Error inserting account information: Missing or null required fields');
    console.log('Account Info:', accountInfo); 
    console.log(firstname, lastname, streetAddress1, streetAddress2, city, Region, country, zipcode);
    return res.status(400).json({ error: 'Missing or null required fields' }); 
  }

  const checkSql = 'SELECT * FROM billing_information WHERE user_id = ?';
  connection.query(checkSql, [userId], (checkError, checkResults) => {
    if (checkError) {
      console.error('Error checking billing information:', checkError);
      return res.status(500).json({ error: 'Error checking billing information' });
    }

    if (checkResults.length > 0) {
      // Update existing billing information
      const updateSql = `
        UPDATE billing_information
        SET firstname = ?, lastname = ?, streetAddress1 = ?, streetAddress2 = ?, city = ?, region = ?, country = ?, zipcode = ?
        WHERE user_id = ?
      `;
      const updateValues = [firstname, lastname, streetAddress1, streetAddress2 || null, city, Region || null, country, zipcode, userId];
      connection.query(updateSql, updateValues, (updateError, updateResults) => {
        if (updateError) {
          console.error('Error updating billing information:', updateError);
          return res.status(500).json({ error: 'Error updating billing information' });
        }
        console.log('Billing information updated successfully');
        res.status(200).json({ message: 'Billing information updated successfully' });
      });
    } else {
      // Insert new billing information
      const insertSql = `
        INSERT INTO billing_information (user_id, firstname, lastname, streetAddress1, streetAddress2, city, region, country, zipcode)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const insertValues = [userId, firstname, lastname, streetAddress1, streetAddress2 || null, city, Region || null, country, zipcode];
      connection.query(insertSql, insertValues, (insertError, insertResults) => {
        if (insertError) {
          console.error('Error inserting billing information:', insertError);
          return res.status(500).json({ error: 'Error inserting billing information' });
        }
        console.log('Billing information inserted successfully');
        res.status(201).json({ message: 'Billing information inserted successfully' });
      });
    }
  });
}

module.exports = {
  insertBillingInformation
};
