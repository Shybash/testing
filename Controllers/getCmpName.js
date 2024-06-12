const db = require('../config/db');

const getCompanyName = async (req, res) => {
  const { email } = req.user;

  try {
    // Log the received email
    console.log('User Email:', email);

    // Query the database for company details
    const [rows] = await db.promise().query('SELECT cmp_name FROM company_details WHERE email = ?', [email]);
    
    
    console.log('Query Results:', rows);

    // Check if the query returned any results
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Company details not found' });
    }

    // Extract company details from the query result
    const companyDetails = rows[0];
    res.status(200).json({ cmp_name: companyDetails.cmp_name});
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getCompanyName };
