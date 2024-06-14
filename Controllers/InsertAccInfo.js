const connection = require('../config/db');

function insertAccountInformation(req, res) {
  const accountInfo = req.body;
  const { phone, streetAddress1, streetAddress2, city, province, country, postalcode, canadianResident } = accountInfo;
  
  const {id,email}=req.user;
  const userId =id;
  console.log(id,email);
 if (!phone || !streetAddress1 || !city || !country || !postalcode || !userId) {
    console.error('Error inserting account information: Missing or null required fields or userId');
    console.log('Account Info:', accountInfo);
    return res.status(400).json({ error: 'Missing or null required fields or userId' });
  }
  const checkSql = 'SELECT * FROM account_information WHERE user_id = ?';
  connection.query(checkSql, [userId], (checkError, checkResults) => {
    if (checkError) {
      console.error('Error checking account information:', checkError);
      return res.status(500).json({ error: 'Error checking account information' });
    }

    if (checkResults.length > 0) {
      const updateSql = `
        UPDATE account_information
        SET phone = ?, streetAddress1 = ?, streetAddress2 = ?, city = ?, province = ?, country = ?, postalcode = ?, canadianResident = ?
        WHERE user_id = ?
      `;
      const updateValues = [phone, streetAddress1, streetAddress2 || null, city, province || null, country, postalcode, canadianResident, userId];
      connection.query(updateSql, updateValues, (updateError, updateResults) => {
        if (updateError) {
          console.error('Error updating account information:', updateError);
          return res.status(500).json({ error: 'Error updating account information' });
        }
        console.log('Account information updated successfully');
        res.status(200).json({ message: 'Account information updated successfully' });
      });
    } else {
      const insertSql = `
        INSERT INTO account_information (phone, streetAddress1, streetAddress2, city, province, country, postalcode, canadianResident, user_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const insertValues = [phone, streetAddress1, streetAddress2 || null, city, province || null, country, postalcode, canadianResident, userId];
      connection.query(insertSql, insertValues, (insertError, insertResults) => {
        if (insertError) {
          console.error('Error inserting account information:', insertError);
          return res.status(500).json({ error: 'Error inserting account information' });
        }
        console.log('Account information inserted successfully');
        res.status(201).json({ message: 'Account information inserted successfully' });
      });
    }
  });
}

module.exports = {
  insertAccountInformation
};
