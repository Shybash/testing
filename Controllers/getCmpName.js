const db = require('../config/db');

const getCompanyName = async (req, res) => {
    const { id } = req.user;
    const userId = id;

    try {
        const [rows] = await db.promise().query('SELECT cmp_name FROM login WHERE userId = ?', [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Company details not found' });
        }

        const companyDetails = rows[0];
        res.status(200).json({ cmp_name: companyDetails.cmp_name });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getCompanyName };
