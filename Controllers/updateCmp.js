const db = require('../config/db');

async function updateCompanyDetails(req, res) {
    const { companyName } = req.body;
    const { id } = req.user;
    const userId = id;

    try {
        // Check if company details exist
        const [selectResults] = await db.promise().query('SELECT * FROM login WHERE id = ?', [companyId]);

        if (selectResults.length === 0) {
            const error = new Error('Company details not found');
            error.statusCode = 404;
            throw error;
        }

        // Company details exist, proceed with update
        const [updateResults] = await db.promise().query('UPDATE login SET companyName = ? WHERE id = ?', [companyName, companyId]);

        console.log('Company details updated successfully');
        res.json({ message: 'Company details updated successfully', updatedRows: updateResults.affectedRows });
    } catch (error) {
        console.error('Error updating company details:', error);
        res.status(error.statusCode || 500).json({ error: error.message });
    }
}

module.exports = { updateCompanyDetails };
