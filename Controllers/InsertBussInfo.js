const connection = require('../config/db');

function InsertBussInfo(req, res) {
  const businessInfo = req.body;
  const { streetAddress1, streetAddress2, city, province, country, zipcode, operateIn, cmp_type, cmp_province } = businessInfo;
  const { id } = req.user;
  const userId = id;

  // Check if all required fields are present
  if (!streetAddress1 || !city || !province || !country || !zipcode || !operateIn || !userId) {
    console.error('Error inserting or updating business information: Missing or null required fields');
    console.log('Business Info:', businessInfo);
    return res.status(400).json({ error: 'Missing or null required fields' });
  }

  // Check if business information already exists for the user
  const checkSql = 'SELECT * FROM business_information WHERE user_id = ?';
  connection.query(checkSql, [userId], (checkError, checkResults) => {
    if (checkError) {
      console.error('Error checking business information:', checkError);
      return res.status(500).json({ error: 'Error checking business information' });
    }

    if (checkResults.length > 0) {
      // Update existing business information
      const updateSql = `
        UPDATE business_information
        SET streetAddress1 = ?, streetAddress2 = ?, city = ?, province = ?, country = ?, zipcode = ?, operateIn = ?, cmp_type = ?, cmp_province = ?
        WHERE user_id = ?
      `;
      const updateValues = [streetAddress1, streetAddress2 || null, city, province, country, zipcode, operateIn, cmp_type, cmp_province, userId];

      connection.query(updateSql, updateValues, (updateError, updateResults) => {
        if (updateError) {
          console.error('Error updating business information:', updateError);
          return res.status(500).json({ error: 'Error updating business information' });
        }
        console.log('Business information updated successfully');
        return res.status(200).json({ message: 'Business information updated successfully' });
      });
    } else {
      // Insert new business information
      const insertSql = `
        INSERT INTO business_information (user_id, streetAddress1, streetAddress2, city, province, country, zipcode, operateIn, cmp_type, cmp_province)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const insertValues = [userId, streetAddress1, streetAddress2 || null, city, province, country, zipcode, operateIn, cmp_type, cmp_province];

      connection.query(insertSql, insertValues, (insertError, insertResults) => {
        if (insertError) {
          console.error('Error inserting business information:', insertError);
          return res.status(500).json({ error: 'Error inserting business information' });
        }
        console.log('Business information inserted successfully');
        return res.status(201).json({ message: 'Business information inserted successfully' });
      });
    }
  });
}

module.exports = {
  InsertBussInfo
};
