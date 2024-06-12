const db = require('../config/db');

const final_review = async (req, res) => {
  const { email } = req.user;

  try {
    // Log the received email
    console.log('User Email:', email);

    // Query the database for details from multiple tables
    const [accountRows] = await db.promise().query('SELECT * FROM account_information WHERE email = ?', [email]);
    const [businessRows] = await db.promise().query('SELECT * FROM business_information WHERE email = ?', [email]);
    const [billingRows] = await db.promise().query('SELECT * FROM billing_information WHERE email = ?', [email]);

    // Log the query results
    console.log('Account Information:', accountRows);
    console.log('Business Information:', businessRows);
    console.log('Billing Address:', billingRows);

    // Check if any of the queries returned results
    if (accountRows.length === 0 && businessRows.length === 0 && billingRows.length === 0) {
      return res.status(404).json({ message: 'Details not found' });
    }

    // Extract details from the query results
    const accountDetails = accountRows.length ? accountRows[0] : {};
    const businessDetails = businessRows.length ? businessRows[0] : {};
    const billingDetails = billingRows.length ? billingRows[0] : {};

    // Combine the details into a single response object
    const companyDetails = {
      account: accountDetails,
      business: businessDetails,
      billing: billingDetails
    };

    // Send the combined details as JSON
    res.status(200).json(companyDetails);
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { final_review };
